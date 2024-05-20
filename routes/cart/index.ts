import express, { NextFunction, Request, Response } from "express";
import {
    CallBackUrlAction,
    GetFactorAction,
    SubmitFactorAction
} from '../../controllers/cartController'
import checkAuhtUser from "../../middlewares/checkAuthUser";
const router = express.Router();

router.post("/submitfactor",
    (req: Request, res: Response, next: NextFunction) => checkAuhtUser(req, res, next, "User"),
    SubmitFactorAction);
router.get("/callbackurl",
    (req: Request, res: Response, next: NextFunction) => checkAuhtUser(req, res, next, "User"),
    CallBackUrlAction);
router.post('/getfactor',
    GetFactorAction)


export default router;
