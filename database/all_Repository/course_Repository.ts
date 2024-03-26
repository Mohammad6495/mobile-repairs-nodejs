import { Types } from "mongoose";
import HttpError from "../../utils/app_error";
import Course from "../models/course_collection";
import { ICourse } from "../../utils/interfaces";
import fs from 'fs';
import path from 'path';

class CourseRepository {
    async Created(input: ICourse) {
        const createdCourse = new Course({
            title: input.title,
            image: input.image,
            description: input.description,
            viewCount: input.viewCount,
            price: input.price,
            courseLevel: input.courseLevel,
            courseStatus: input.courseStatus,
            teacher: input.teacher,
            isAvailable: input.isAvailable,
            isFree: input.isFree,
            category: input.category,
            headLines: input.headLines
        });
        const CourseResult = await createdCourse.save();
        return CourseResult
    }
    async Edit(input: ICourse) {
        const validObjectId = Types.ObjectId.isValid(input.id);
        if (!validObjectId) {
            throw new HttpError(["فرمت شناسه نادرست است!"], 422);
        }
        const findCourse = await Course.findById(input.id);
        if (!findCourse) {
            throw new HttpError(["دوره مورد نظر یافت نشد!"], 422);
        }

        const previousImagePath = findCourse.image as string;
        
        //propertiesCourse
        findCourse.title = input.title;
        findCourse.description = input.description;
        findCourse.viewCount = input.viewCount;
        findCourse.price = input.price;
        findCourse.courseLevel = input.courseLevel;
        findCourse.courseStatus = input.courseStatus;
        findCourse.teacher = input.teacher;
        findCourse.isAvailable = input.isAvailable;
        findCourse.isFree = input.isFree;
        findCourse.category = input.category;
        findCourse.headLines = input.headLines;
        findCourse.image = input.image ? input.image : findCourse.image; 
        const editResult = await findCourse.save();
        if (input.image && previousImagePath) {
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
        const allCategories = await Course.find({ isActive: true, isAvailable: true }).sort({ createdAt: -1 });
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
        const course = await Course.find({ ...searchCondition, isActive: true })
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 })
        const totalCourse = await Course.find({ isActive: true }).countDocuments(
            searchCondition
        );
        return {
            totalRecords: totalCourse,
            data: course.map(item => item.toObject({ getters: true }))
        }
    }
    async ChangeIsAvailable({ id }: { id: Types.ObjectId }) {
        const validObjectId = Types.ObjectId.isValid(id);
        if (!validObjectId) {
            throw new HttpError(["فرمت شناسه نادرست است!"], 422);
        }
        const findCourse = await Course.findById(id);
        if (!findCourse) {
            throw new HttpError(["دوره مورد نظر یافت نشد!"], 422);
        }
        if (findCourse.isAvailable) {
            findCourse.isAvailable = false
        } else {
            findCourse.isAvailable = true
        }
        const result = await findCourse.save();
        return result;
    }
    async Delete({ id }: { id: Types.ObjectId }) {
        const validObjectId = Types.ObjectId.isValid(id);
        if (!validObjectId) {
            throw new HttpError(["فرمت شناسه نادرست است!"], 422);
        }
        const deletedCourse = await Course.findById(id);
        if (!deletedCourse) {
            throw new HttpError(["دوره مورد نظر یافت نشد!"], 422);
        }
        deletedCourse.isActive = false;
        await deletedCourse.save()
        return deletedCourse;
    }
}

export default CourseRepository;
