import { NextFunction, Response, Request } from "express";
import HeadlineServices from "../../services/headlines_Services";
import { myValidationResult } from "../../utils/utility";
import HttpError from "../../utils/app_error";

const services = new HeadlineServices();

export const CreatedAction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, description, course } = req.body;
    const errors = myValidationResult(req).array();
    if (errors.length !== 0) {
      throw new HttpError(errors, 401, null);
    }
    const data = await services.CreatedHeadline({ title, description, course });
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
    const { title, id, description } = req.body;
    console.log(title)
    const errors = myValidationResult(req).array();
    if (errors.length !== 0) {
      throw new HttpError(errors, 401, null);
    }
    const data = await services.EditHeadline({ title, id, description });
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
    console.log(pageSize)
    const data = await services.GetHeadline(currentPage as string, pageSize as string, search as string);
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
    const data = await services.GetHeadlineClient();
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

export const DeleteHeadlineAction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.query;
    const data = await services.DeleteHeadline(id as any);
    res.json({ ...data });
  } catch (err) {
    next(err);
  }
};
