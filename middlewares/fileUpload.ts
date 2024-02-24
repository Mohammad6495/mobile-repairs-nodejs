import multer from 'multer'

const type: any = {
  "image/png": "png",
  "image/jpg": "jpg",
  "image/jpeg": "jpeg",
};

const fileUpload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "assets/uploads"); 
    },
    filename: (req, file, cb) => {
      const ext = type[file.mimetype] as any;
      cb(null, Math.floor(Math.random() * 1000000) + "." + ext);
    },
  }),
  fileFilter: (req, file, cb) => {
    const isValid = !!type[file.mimetype];
    let error = isValid ? null : new Error("پسوند فایل ارسالی اشتباه میباشد");
    cb(error as any, isValid);
  },
});

export default fileUpload;
