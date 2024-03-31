import { Types } from "mongoose";
import HttpError from "../../utils/app_error";
import EductionalVideos from "../models/eductionalVideo_collection";
import HeadLine from '../models/headLines_collection'
import { IEductionalVideo } from "../../utils/interfaces";

class EductionalVideosRepository {
    async Created({ title, headLine, isPayActive, videoTime }: IEductionalVideo) {
        const createdEductionalVideos = new EductionalVideos({
            title: title,
            headLine: headLine,
            isPayActive: isPayActive,
            videoTime: videoTime
        })
        const EductionalVideosResult = await createdEductionalVideos.save();
        const findHeadline = await HeadLine.findById(headLine);
        if (!findHeadline) {
            throw new HttpError(["سرفصل مورد نظر یافت نشد!"], 422);
        }
        findHeadline.eductionals.push(EductionalVideosResult.id);
        await findHeadline.save()
        return EductionalVideosResult
    }
    async Edit({ id, title, isPayActive, videoTime }: IEductionalVideo) {
        const findEductionalVideos = await EductionalVideos.findById(id);
        if (!findEductionalVideos) {
            throw new HttpError(["ویدیو مورد نظر یافت نشد!"], 422);
        }
        findEductionalVideos.title = title as string;
        findEductionalVideos.headLine = findEductionalVideos.headLine;
        findEductionalVideos.isPayActive = isPayActive as boolean;
        findEductionalVideos.videoTime = videoTime;
        const editResult = await findEductionalVideos.save();
        return editResult;
    }
    async GetAll() {
        const allCategories = await EductionalVideos.find({ isActive: true, isAvailable: true }).sort({ createdAt: -1 });
        return allCategories
    }
    async Get({ pageSize, currentPage, search, headlineId }: { pageSize: string, currentPage: string, search: string, headlineId: Types.ObjectId }) {
        const validObjectId = Types.ObjectId.isValid(headlineId);
        if (!validObjectId) {
            throw new HttpError(["فرمت شناسه نادرست است!"], 422);
        }
        const limit = parseInt(pageSize) || 10;
        const skip = (parseInt(currentPage) - 1) * limit || 0;

        const searchCondition = search
            ? {
                $or: [
                    { title: { $regex: search, $options: "i" } },
                ]
            }
            : {};
        const eductionalVideos = await EductionalVideos.find({ ...searchCondition, isActive: true, headLine: headlineId })
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 })
        const totalEductionalVideos = await EductionalVideos.find({ isActive: true }).countDocuments(
            searchCondition
        );
        return {
            totalRecords: totalEductionalVideos,
            data: eductionalVideos.map(item => item.toObject({ getters: true }))
        }
    }
    async ChangeIsAvailable({ id }: { id: Types.ObjectId }) {
        const validObjectId = Types.ObjectId.isValid(id);
        if (!validObjectId) {
            throw new HttpError(["فرمت شناسه نادرست است!"], 422);
        }
        const findEductionalVideos = await EductionalVideos.findById(id);
        if (!findEductionalVideos) {
            throw new HttpError(["ویدیو مورد نظر یافت نشد!"], 422);
        }
        if (findEductionalVideos.isAvailable) {
            findEductionalVideos.isAvailable = false
        } else {
            findEductionalVideos.isAvailable = true
        }
        const result = await findEductionalVideos.save();
        return result;
    }
    async Delete({ id }: { id: Types.ObjectId }) {
        const validObjectId = Types.ObjectId.isValid(id);
        if (!validObjectId) {
            throw new HttpError(["فرمت شناسه نادرست است!"], 422);
        }
        const deletedEductionalVideos = await EductionalVideos.findOneAndDelete({ _id: id });
        if (!deletedEductionalVideos) {
            throw new HttpError(["ویدیو مورد نظر یافت نشد!"], 422);
        }
        return deletedEductionalVideos;
    }
}

export default EductionalVideosRepository;
