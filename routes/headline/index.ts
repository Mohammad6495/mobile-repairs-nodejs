import express, { NextFunction, Request, Response } from "express";
import HeadLineValidation from "../../validations/headlineValidation";
import {
    ChangeIsAvailableAction,
    CreatedAction,
    DeleteHeadlineAction,
    EditAction,
    GetAllAction,
    GetAllClientAction
} from '../../controllers/headlineController'
import checkAuhtUser from "../../middlewares/checkAuthUser";

const router = express.Router();
const validation = new HeadLineValidation();

router.post("/create",
    (req: Request, res: Response, next: NextFunction) => checkAuhtUser(req, res, next, 'Management'),
    validation.headlineValidation(),
    CreatedAction);
router.post("/edit",
    (req: Request, res: Response, next: NextFunction) => checkAuhtUser(req, res, next, 'Management'),
    validation.headlineValidation(),
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
    DeleteHeadlineAction)

export default router;
