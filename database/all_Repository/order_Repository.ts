import HttpError from "../../utils/app_error";
import Order from "../models/order_collection";
import User from "../models/user_collection";
import { IOrder } from "../../utils/interfaces";
import { Types } from "mongoose";

class OrdersRepository {
    async Created(input: IOrder) {
        const createdOrder = new Order({
            course: input.course,
            isPay: input?.isPay,
            licenceKey: '---',
            totalPrice: input?.totalPrice,
            user: input.user,
            resnumber: input.resnumber
        });

        const order = await createdOrder.save();
        const findUser = await User.findById(order.user);
        if (!findUser) {
            throw new HttpError(["کاربر مورد نظر یافت نشد!"], 422);
        }
        findUser.orders.push(order.id);
        await findUser.save()
        return order
    }
    async GetAll() {
        const allCategories = await Order.find({ isActive: true, isAvailable: true }).sort({ createdAt: -1 });
        return allCategories
    }
    async Detail(id: Types.ObjectId) {
        const findOrder = await Order.findById(id).populate('course').exec();
        return findOrder
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
        const order = await Order.find({ ...searchCondition, isActive: true })
            .skip(skip)
            .limit(limit)
            .populate('course')
            .sort({ createdAt: -1 })
        const totalOrder = await Order.find({ isActive: true }).countDocuments(
            searchCondition
        );
        return {
            totalRecords: totalOrder,
            data: order.map(item => item.toObject({ getters: true }))
        }
    }
}

export default OrdersRepository