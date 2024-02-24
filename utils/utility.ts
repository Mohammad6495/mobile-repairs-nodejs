import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";

import { APP_SECRET_KEY } from "../config";

export const GenerateSalt = async () => {
  return await bcrypt.genSalt();
};

export const GeneratePassword = async (
  password: string,
  salt: string | number
) => {
  return await bcrypt.hash(password, salt);
};

export const ValidatePassword = async (
  inputPassword: string,
  userPassword: string
) => {
  return await bcrypt.compare(inputPassword, userPassword);
};

export const myValidationResult = validationResult.withDefaults({
  formatter: (error: any) => error.msg,
});

export const GenerateSignature = async (payload: string | object | Buffer) => {
  try {
    return await jwt.sign(payload, APP_SECRET_KEY, { expiresIn: "1y" });
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const FormateData = <T>({
  data,
  statusCode = 200,
  message = "با موفقیت انجام شد",
}: {
  data: T;
  statusCode?: number;
  message?: string;
}): { data: T; statusCode: number; message: string } => {
  if (data) {
      return {
          data: data,
          statusCode,
          message,
      };
  } else {
      throw new Error("Data Not found!");
  }
};
