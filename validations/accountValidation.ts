import { check } from "express-validator";

class AccountValidation {
  signUpValidation() {
    return [
      check("userName", "نام کاربری اجباری میباشد").not().isEmpty(),
      check("password", "رمز اجباری میباشد").not().isEmpty(),
    ];
  }
}

export default AccountValidation
