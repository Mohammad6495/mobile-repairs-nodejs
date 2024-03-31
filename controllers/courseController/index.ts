import { NextFunction, Response, Request } from "express";
import CourseServices from "../../services/course_Services";
import { myValidationResult } from "../../utils/utility";
import HttpError from "../../utils/app_error";

const services = new CourseServices();

export const CreatedAction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = myValidationResult(req).array();
    if (errors.length !== 0) {
      throw new HttpError(errors, 401, null);
    }
    const data = await services.CreatedCourse({ ...req.body, image: req?.file?.path || undefined });
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
    const errors = myValidationResult(req).array();
    if (errors.length !== 0) {
      throw new HttpError(errors, 401, null);
    }
    const data = await services.EditCourse({ ...req.body, image: req?.file?.path || undefined });
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
    const { pageSize, currentPage, search } = req.query;
    const data = await services.GetCourse(currentPage as string, pageSize as string, search as string);
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
    const data = await services.GetCourseClient();
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

export const DeleteCourseAction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.query;
    const data = await services.DeleteCourse(id as any);
    res.json({ ...data });
  } catch (err) {
    next(err);
  }
};

export const DetailCourseAction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.query;
    const data = await services.DetailCourse(id as any);
    res.json({ ...data });
  } catch (err) {
    next(err);
  }
};
