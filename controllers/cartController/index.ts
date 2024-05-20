import { NextFunction, Response, Request } from "express";
import CartServices from "../../services/cart_Services";

const services = new CartServices();

export const SubmitFactorAction = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { items } = req.body;
    const data = await services.SubmitFactor(items, req.user );
    res.json({ ...data });
  } catch (err) {
    next(err);
  }
};

export const CallBackUrlAction = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { Status, Authority } = req.query;

    const data = await services.callbackurl(Status, Authority, req.user);
    if(data?.data?.url){
      res.redirect(data?.data?.url)
    }else {
      res.json({ ...data });
    }
  } catch (err) {
    next(err);
  }
};

export const GetFactorAction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { items } = req.body;
    const data = await services.GetFactor(items);
    res.json({ ...data });
  } catch (err) {
    next(err);
  }
};
