import { NextFunction, Response, Request } from "express";
import EductionalVideoServices from "../../services/eductionalVideo_Services";
import { myValidationResult } from "../../utils/utility";
import HttpError from "../../utils/app_error";
import { Types } from "mongoose";

const services = new EductionalVideoServices();

export const CreatedAction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, headLine, isPayActive, videoTime} = req.body;
    const errors = myValidationResult(req).array();
    if (errors.length !== 0) {
      throw new HttpError(errors, 401, null);
    }
    const data = await services.CreatedEductionalVideo({title, headLine, isPayActive, videoTime });
    res.json({ ...data });
  } catch (err) {
    next(err);
  }
};

export const EditAction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id, title, headLine, isPayActive, videoTime } = req.body;
    console.log(title)
    const errors = myValidationResult(req).array();
    if (errors.length !== 0) {
      throw new HttpError(errors, 401, null);
    }
    const data = await services.EditEductionalVideo({ id, title, headLine, isPayActive, videoTime });
    res.json({ ...data });
  } catch (err) {
    next(err);
  }
};

export const GetAllAction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { pageSize, currentPage, search, headlineId } = req.query;
    console.log(pageSize)
    const data = await services.GetEductionalVideo(currentPage as string, pageSize as string, search as string, headlineId as any);
    res.json({ ...data });
  } catch (err) {
    next(err);
  }
};
export const GetAllClientAction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await services.GetEductionalVideoClient();
    res.json({ ...data });
  } catch (err) {
    next(err);
  }
};

export const ChangeIsAvailableAction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.query;
    const data = await services.ChangeIsAvailable(id as any);
    res.json({ ...data });
  } catch (err) {
    next(err);
  }
};

export const DeleteEductionalVideoAction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.query;
    const data = await services.DeleteEductionalVideo(id as any);
    res.json({ ...data });
  } catch (err) {
    next(err);
  }
};
