import { check } from "express-validator";

class HeadlineValidation {
  headlineValidation() {
    return [
      check("title", "عنوان سرفصل اجباری میباشد").not().isEmpty(),
      check("course", "دوره سرفصل اجباری میباشد").not().isEmpty(),
    ];
  }
}

export default HeadlineValidation
