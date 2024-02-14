import multer from "multer";
import path from "path";
import { Request, Response } from "express";

// Destination to store image
const imageStorage = multer.diskStorage({
  destination: function (req: Request, file: Express.Multer.File, cb: any) {
    let folder: string = "";

    if (req.baseUrl?.includes("users")) {
      folder = "users";
    } else if (req.baseUrl?.includes("product")) {
      folder = "product";
    }
    cb(null, `public/images/${folder}/`);
  },
  filename: (req: Request, file: Express.Multer.File, cb: any) => {
    cb(
      null,
      Date.now() +
        String(Math.floor(Math.random() * 70)) +
        path.extname(file.originalname)
    );
  },
});

const imageUpload = multer({
  storage: imageStorage,
  fileFilter(req: Request, file: Express.Multer.File, cb: any) {
    if (!file.originalname.match(/\.(png|jpg)$/)) {
      // upload only png and jpg format
      return cb(new Error("Por favor, envie apenas png ou jpg!"));
    }
    cb(null, true);
  },
});

export default imageUpload;
