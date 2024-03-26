import { Types } from "mongoose";
import HttpError from "../../utils/app_error";
import Category from "../models/category_collection";
import { ICategory } from "../../utils/interfaces";
import fs from 'fs';
import path from 'path';

class CategoryRepository {
    async Created({ title, image }: ICategory) {
        const createdCategory = new Category({
            title: title,
            image
        })
        const categoryResult = await createdCategory.save();
        return categoryResult
    }
    async Edit({ id, title, image }: ICategory) {
        const findCategory = await Category.findById(id);
        if (!findCategory) {
            throw new HttpError(["دسته بندی مورد نظر یافت نشد!"], 422);
        }
        const previousImagePath = findCategory.image as string;
        findCategory.title = title as string;
        findCategory.image = image ? image : findCategory.image as string
        const editResult = await findCategory.save();
        if (image && previousImagePath) {
            const fullPath = path.join(previousImagePath);
            if (fs.existsSync(fullPath)) {
                fs.unlinkSync(fullPath);
            } else {
                throw new HttpError(["ادرس عکس مورد نظر یافت نشد!"], 422);
            }
        }
        return editResult;
    }
    async GetAll() {
        const allCategories = await Category.find({ isActive: true, isAvailable: true }).sort({ createdAt: -1 });
        return allCategories
    }
    async Get({ pageSize, currentPage, search }: { pageSize: string, currentPage: string, search: string }) {
        const limit = parseInt(pageSize) || 10;
        const skip = (parseInt(currentPage) - 1) * limit || 0;

        const searchCondition = search
            ? {
                $or: [
                    { title: { $regex: search, $options: "i" } },
                ]
            }
            : {};
        const category = await Category.find({ ...searchCondition, isActive: true })
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 })
        const totalCategory = await Category.find({ isActive: true }).countDocuments(
            searchCondition
        );
        return {
            totalRecords: totalCategory,
            data: category.map(item => item.toObject({ getters: true }))
        }
    }
    async ChangeIsAvailable({ id }: { id: Types.ObjectId }) {
        const validObjectId = Types.ObjectId.isValid(id);
        if (!validObjectId) {
            throw new HttpError(["فرمت شناسه نادرست است!"], 422);
        }
        const findCategory = await Category.findById(id);
        if (!findCategory) {
            throw new HttpError(["دسته بندی مورد نظر یافت نشد!"], 422);
        }
        if (findCategory.isAvailable) {
            findCategory.isAvailable = false
        } else {
            findCategory.isAvailable = true
        }
        const result = await findCategory.save();
        return result;
    }
    async Delete({ id }: { id: Types.ObjectId }) {
        const validObjectId = Types.ObjectId.isValid(id);
        if (!validObjectId) {
            throw new HttpError(["فرمت شناسه نادرست است!"], 422);
        }
        const deletedCategory = await Category.findOneAndDelete({ _id: id });
        if (!deletedCategory) {
            throw new HttpError(["دسته بندی مورد نظر یافت نشد!"], 422);
        }
        const previousImagePath = deletedCategory.image as string;

        if (previousImagePath) {
            const fullPath = path.join(previousImagePath);
            if (fs.existsSync(fullPath)) {
                fs.unlinkSync(fullPath);
            } else {
                throw new HttpError(["ادرس عکس مورد نظر یافت نشد!"], 422);
            }
        }
        return deletedCategory;
    }
}

export default CategoryRepository;
