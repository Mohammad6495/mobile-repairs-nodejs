import jwt from "jsonwebtoken";
import User from "../database/models/user_collection";
import { APP_SECRET_KEY } from "../config";
 
const checkAuhtUser = async (req: any, res: any, next: any, role: string) => {
  
  try {
    const token = req?.headers?.authorization?.split(" ")[1];
  
    if (!token) {
      res.json({
        message: null,
        errors: ["کاربر نامعتبر"],
        statusCode: 401,
        data: null,
      });
      return; 
    }
    const decoded = jwt.verify(token, APP_SECRET_KEY) as any;
    if (!decoded) {
      res.json({
        message: null,
        errors: ["کاربر نامعتبر"],
        statusCode: 401, 
        data: null,
      });
      return;
    }
    const userId = decoded._id as any;
    const user = await User.findById(userId).populate('role');

    if (!user) {
      res.json({
        message: null,
        errors: ["کاربر نامعتبر"],
        statusCode: 401,
        data: null,
      }); 
      return;
    }

    // if(user.role.findIndex((a: any)=>a.name == role) === -1) {
    //   res.json({
    //     message: null,
    //     errors: [`${role} نامعتبر`],
    //     statusCode: 401,
    //     data: null,
    //   });
    //   return;
    // }

    req.user = {
      id: user.id,
      userName: user.userName,
      token: user.token,
      role: user.role
    };
    next();
  } catch (err) {
    res.json({
      message: null,
      errors: ["کاربر نامعتبر"],
      statusCode: 401,
      data: null,
    });
    return
  }
};

export default checkAuhtUser;
