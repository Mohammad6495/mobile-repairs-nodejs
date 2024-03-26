import express, { NextFunction, Request, Response } from "express";
import CourseValidation from "../../validations/courseValidation";
import {
    ChangeIsAvailableAction,
    CreatedAction,
    DeleteCourseAction,
    EditAction,
    GetAllAction,
    GetAllClientAction
} from '../../controllers/courseController'
import checkAuhtUser from "../../middlewares/checkAuthUser";
import fileUpload from "../../middlewares/fileUpload";
const router = express.Router();
const validation = new CourseValidation();

router.post("/create",
    (req: Request, res: Response, next: NextFunction) => checkAuhtUser(req, res, next, 'Management'),
    fileUpload.single('image'),
    validation.CourseValidation(),
    CreatedAction);
router.post("/edit",
    (req: Request, res: Response, next: NextFunction) => checkAuhtUser(req, res, next, 'Management'),
    fileUpload.single('image'),
    validation.CourseValidation(),
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
    DeleteCourseAction)

export default router;
