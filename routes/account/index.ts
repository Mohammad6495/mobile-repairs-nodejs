import express from "express";
import AccountValidation from "../../validations/accountValidation";
import {
    SignAction,
    loginAction,
    GetProfile
} from '../../controllers/accountController'
import checkAuhtUser from "../../middlewares/checkAuthUser";
const router = express.Router();
const validation = new AccountValidation();

router.post("/login-panel", validation.signUpValidation(), loginAction);
router.get('/getprofile', (req, res, next) => checkAuhtUser(req, res, next, 'Management'), GetProfile)
// router.post("/signup-panel", validation.signUpValidation(), SignAction);

export default router;
