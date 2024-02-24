import { NextFunction, Response, Request } from "express";
import CategoryServices from "../../services/category_Services";
import { myValidationResult } from "../../utils/utility";
import HttpError from "../../utils/app_error";

const services = new CategoryServices();

export const CreatedAction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, image = req?.file?.path || undefined } = req.body;
    const errors = myValidationResult(req).array();
    if (errors.length !== 0) {
      throw new HttpError(errors, 401, null);
    }
    const data = await services.CreatedCategory(title, image);
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
    const { title, id, image = req?.file?.path || undefined } = req.body;
    const errors = myValidationResult(req).array();
    if (errors.length !== 0) {
      throw new HttpError(errors, 401, null);
    }
    const data = await services.EditCategory(title, id, image);
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
    const data = await services.GetCategory(currentPage as string, pageSize as string, search as string);
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
    const data = await services.GetCategoryClient();
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

export const DeleteCategoryAction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.query;
    const data = await services.DeleteCategory(id as any);
    res.json({ ...data });
  } catch (err) {
    next(err);
  }
};
