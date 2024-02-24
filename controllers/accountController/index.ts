import { NextFunction, Response, Request } from "express";
import UserServices from "../../services/account_service";
import { myValidationResult } from "../../utils/utility";
import HttpError from "../../utils/app_error";

const services = new UserServices();

export const loginAction = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { userName, password } = req.body;
        const errors = myValidationResult(req).array();
        if (errors.length !== 0) {
            throw new HttpError(errors, 401, null);
        }
        const data = await services.LoginServicePanel({ password, userName });
        res.json({ ...data });
    } catch (err) {
        next(err);
    }
};

export const SignAction = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { userName, password } = req.body;
        const errors = myValidationResult(req).array();
        if (errors.length !== 0) {
            throw new HttpError(errors, 401, null);
        }
        const data = await services.SignUpServicePanel({ password, userName });
        res.json({ ...data });
    } catch (err) {
        next(err);
    }
};

export const GetProfile = async (
    req: Request | any,
    res: Response,
    next: NextFunction
) => {
    try {
        const { userName } = req.user;
        const data = await services.GetUserServices(userName);
        res.json({ ...data });
    } catch (err) {
        next(err);
    }
}
