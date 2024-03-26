import { Types } from "mongoose";
import HttpError from "../../utils/app_error";
import HeadLines from "../models/headLines_collection";
import Course from "../models/course_collection";
import { IHeadLine } from "../../utils/interfaces";

class HeadLinesRepository {
    async Created({ title, course, description }: IHeadLine) {
        const createdHeadLines = new HeadLines({
            title: title,
            course: course,
            description: description,
        })
        const HeadLinesResult = await createdHeadLines.save();
        const findCourse = await Course.findById(course);
        if (!findCourse) {
            throw new HttpError(["دوره مورد نظر یافت نشد!"], 422);
        }
        findCourse.headLines.push(HeadLinesResult.id);
        await findCourse.save()
        return HeadLinesResult
    }
    async Edit({ id, title, description }: IHeadLine) {
        const findHeadLines = await HeadLines.findById(id);
        if (!findHeadLines) {
            throw new HttpError(["دسته بندی مورد نظر یافت نشد!"], 422);
        }
        findHeadLines.title = title as string;
        findHeadLines.description = description as string;
        findHeadLines.course = findHeadLines.course;
        const editResult = await findHeadLines.save();
        return editResult;
    }
    async GetAll() {
        const allCategories = await HeadLines.find({ isActive: true, isAvailable: true }).sort({ createdAt: -1 });
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
        const headLines = await HeadLines.find({ ...searchCondition, isActive: true })
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 })
        const totalHeadLines = await HeadLines.find({ isActive: true }).countDocuments(
            searchCondition
        );
        return {
            totalRecords: totalHeadLines,
            data: headLines.map(item => item.toObject({ getters: true }))
        }
    }
    async ChangeIsAvailable({ id }: { id: Types.ObjectId }) {
        const validObjectId = Types.ObjectId.isValid(id);
        if (!validObjectId) {
            throw new HttpError(["فرمت شناسه نادرست است!"], 422);
        }
        const findHeadLines = await HeadLines.findById(id);
        if (!findHeadLines) {
            throw new HttpError(["دسته بندی مورد نظر یافت نشد!"], 422);
        }
        if (findHeadLines.isAvailable) {
            findHeadLines.isAvailable = false
        } else {
            findHeadLines.isAvailable = true
        }
        const result = await findHeadLines.save();
        return result;
    }
    async Delete({ id }: { id: Types.ObjectId }) {
        const validObjectId = Types.ObjectId.isValid(id);
        if (!validObjectId) {
            throw new HttpError(["فرمت شناسه نادرست است!"], 422);
        }
        const deletedHeadLines = await HeadLines.findOneAndDelete({ _id: id });
        if (!deletedHeadLines) {
            throw new HttpError(["دسته بندی مورد نظر یافت نشد!"], 422);
        }
        return deletedHeadLines;
    }
}

export default HeadLinesRepository;
