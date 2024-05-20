import { NextFunction, Response, Request } from "express";
import OrderServices from "../../services/order_Services";
import { myValidationResult } from "../../utils/utility";
import HttpError from "../../utils/app_error";

const services = new OrderServices();

export const GetAllAction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { pageSize, currentPage, search } = req.query;
    const data = await services.GetOrder(currentPage as string, pageSize as string, search as string);
    res.json({ ...data });
  } catch (err) {
    next(err);
  }
};
export const DetailOrderAction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.query;
    const data = await services.DetailOrder(id as any);
    res.json({ ...data });
  } catch (err) {
    next(err);
  }
};

