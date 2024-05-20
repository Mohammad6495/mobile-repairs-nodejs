import { Types } from "mongoose";
import HttpError from "../../utils/app_error";
import User from "../models/user_collection";
import Role from '../models/role_collection'
import { IUser } from "../../utils/interfaces";
// import { IUserDTO } from "../../DTO/DTOInterfaces";

class AccountRepository {
  async CreatedCustomer({ password, userName, id }: IUser) {
    const findValidUser = await User.findOne({ userName: userName });
    if (findValidUser) {
      throw new HttpError(["کاربر مورد نظر قبلا ثبت نام کرده است!"], 422);
    }
    const newRole = new Role({
      label: 'مدیریت',
      name: 'Management',
    })
    await newRole.save()
    const findRole = await Role.find({})
    const createdUser = new User({
      password,
      userName,
      firstName: 'مدیر',
      lastName: 'پنل مدیریت',
      nikname: 'مدیر پنل مدیریت',
      role: findRole[0].id
    });
    const userResult = await createdUser.save();
    return userResult;
  }

  async SaveToken({ token, id }: { token: any; id: Types.ObjectId }) {
    try {
      const findCustomer = await User.findById(id).populate('role');
      if (!findCustomer) {
        throw new HttpError(["کاربر مورد نظر یافت نشد!"], 422);
      }
      findCustomer.token = token || "";
      await findCustomer.save();
      return findCustomer;
    } catch (error: any) {
      throw new HttpError([error.message], 500);
    }
  }

  async FindCustomer({ userName }: { userName: string }) {
    const findCustomer = await User.findOne({ userName: userName }).populate('role');
    if (!findCustomer) {
      throw new HttpError(["کاربر مورد نظر یافت نشد!"], 422);
    }
    return findCustomer;
  }
}

export default AccountRepository;
