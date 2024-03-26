import { check } from "express-validator";

class CourseValidation {
  CourseValidation() {
    return [
      check("title", "عنوان دوره اجباری میباشد").not().isEmpty(),
      check("price", "قیمت دوره اجباری میباشد").not().isEmpty(),
      check("category", "دسته بندی دوره اجباری میباشد").not().isEmpty(),
    ];
  }
}

export default CourseValidation
