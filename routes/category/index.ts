import express, { NextFunction, Request, Response } from "express";
import CategoryValidation from "../../validations/categoryValidation";
import {
    ChangeIsAvailableAction,
    CreatedAction,
    DeleteCategoryAction,
    EditAction,
    GetAllAction,
    GetAllClientAction
} from '../../controllers/categoryController'
import checkAuhtUser from "../../middlewares/checkAuthUser";
import fileUpload from "../../middlewares/fileUpload";
const router = express.Router();
const validation = new CategoryValidation();

router.post("/create",
    (req: Request, res: Response, next: NextFunction) => checkAuhtUser(req, res, next, 'Management'),
    fileUpload.single('image'),
    validation.categoryValidation(),
    CreatedAction);
router.post("/edit",
    (req: Request, res: Response, next: NextFunction) => checkAuhtUser(req, res, next, 'Management'),
    fileUpload.single('image'),
    validation.categoryValidation(),
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
    DeleteCategoryAction)

export default router;
