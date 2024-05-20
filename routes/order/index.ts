import express, { NextFunction, Request, Response } from "express";
import {
    GetAllAction,
    DetailOrderAction
} from '../../controllers/orderController'
import checkAuhtUser from "../../middlewares/checkAuthUser";
import fileUpload from "../../middlewares/fileUpload";
const router = express.Router();

router.get('/getAll',
    (req, res, next) => checkAuhtUser(req, res, next, 'Management'),
    GetAllAction)
router.get('/detail',
    (req, res, next) => checkAuhtUser(req, res, next, 'Management'),
    DetailOrderAction)


export default router;
