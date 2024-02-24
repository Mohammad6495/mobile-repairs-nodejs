import { check } from "express-validator";

class CategoryValidation {
  categoryValidation() {
    return [
      check("title", "عنوان دسته بندی اجباری میباشد").not().isEmpty(),
    ];
  }
}

export default CategoryValidation
