import express, { NextFunction, Request, Response } from "express";
import EductionalVideoValidation from "../../validations/eductionalVideoValidation";
import {
    ChangeIsAvailableAction,
    CreatedAction,
    DeleteEductionalVideoAction,
    EditAction,
    GetAllAction,
    GetAllClientAction
} from '../../controllers/eductionalVideoController'
import checkAuhtUser from "../../middlewares/checkAuthUser";

const router = express.Router();
const validation = new EductionalVideoValidation();

router.post("/create",
    (req: Request, res: Response, next: NextFunction) => checkAuhtUser(req, res, next, 'Management'),
    validation.eductionalVideoValidation(),
    CreatedAction);
router.post("/edit",
    (req: Request, res: Response, next: NextFunction) => checkAuhtUser(req, res, next, 'Management'),
    validation.eductionalVideoValidation(),
    EditAction);
router.get('/getAll',
    (req, res, next) => checkAuhtUser(req, res, next, 'Management'),
    GetAllAction)
router.get('/getAllClient', GetAllClientAction)

router.post('/changeavailable',
    (req, res, next) => checkAuhtUser(req, res, next, 'Management'),
    ChangeIsAvailableAction)
router.delete('/remove',
    (req, res, next) => checkAuhtUser(req, res, next, 'Management'),
    DeleteEductionalVideoAction)

export default router;
