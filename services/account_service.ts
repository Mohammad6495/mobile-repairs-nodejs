import { Types } from "mongoose";
import AccountRepository from "../database/all_Repository/account_Repository";
import HttpError from "../utils/app_error";

import {
  FormateData,
  ValidatePassword,
  GenerateSignature,
  GeneratePassword,
  GenerateSalt,
} from "../utils/utility";

type TLoginType = {
  userName: string;
  password: string;
};

class UserServices {
  private repository: AccountRepository;

  constructor() {
    this.repository = new AccountRepository();
  }

  async SignUpServicePanel({ userName, password }: TLoginType) {
    let sult = await GenerateSalt();

    let userPassword = await GeneratePassword(password, sult);

    const existingUser = await this.repository.CreatedCustomer({
      password: userPassword,
      userName,
    });

    const token = await GenerateSignature({
      email: userName,
      id: existingUser._id,
    });

    const data = await this.repository.SaveToken({
      id: existingUser._id,
      token: token,
    });

    return FormateData({ data: data });
  }

  async LoginServicePanel({ userName, password }: TLoginType) {
    const findCustomerData = await this.repository.FindCustomer({
      userName: userName,
    });

    const validPassword = await ValidatePassword(
      password,
      findCustomerData.password as string
    );

    const token = await GenerateSignature({
      email: userName,
      _id: findCustomerData._id,
    });
    const userData = await this.repository.SaveToken({
      token: token as unknown,
      id: findCustomerData.id,
    });

    if (!validPassword) {
      throw new HttpError(["نام کاربری یا رمز عبور اشتباه میباشد"], 422);
    }
    const { password: excludedPassword, ...rest } = userData.toObject({ getters: true })
    return FormateData({ data: rest });
  }

  async GetUserServices(userName: string) {
    const findCustomerData = await this.repository.FindCustomer({
      userName: userName,
    });
    const { password: excludedPassword, ...rest } = findCustomerData.toObject({ getters: true })

    return FormateData({ data: rest });
  }
}

export default UserServices;
