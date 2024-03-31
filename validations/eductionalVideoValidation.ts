import { check } from "express-validator";

class EductionaLVideoValidation {
  eductionalVideoValidation() {
    return [
      check("title", "عنوان ویدیو اجباری میباشد").not().isEmpty(),
      check("videoTime", "زمان ویدیو اجباری میباشد").not().isEmpty(),
      check("headLine", "سرفصل اجباری میباشد").not().isEmpty(),
    ];
  }
}

export default EductionaLVideoValidation
