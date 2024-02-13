const multer = require("multer");
const path = require("path");

// Destination to store image
export const imageStorage = multer.diskStorage({
  destination: function (req: any, file: any, cb: any) {
    let folder: string = "";
    console.log(req);

    if (req.baseUrl.includes("users")) {
      folder = "users";
    } else if (req.baseUrl.includes("produtc")) {
      folder = "produtc";
    }
    cb(null, `public/images/${folder}/`);
  },
  filename: (req: any, file: any, cb: any) => {
    cb(
      null,
      Date.now() +
        String(Math.floor(Math.random() * 70)) +
        path.extname(file.originalname)
    );
  },
});

export const imageUpload = multer({
  storage: imageStorage,
  fileFilter(req: any, file: any, cb: any) {
    if (!file.originalname.match(/\.(png|jpg)$/)) {
      // upload only png and jpg format
      return cb(new Error("Por favor, envie apenas png ou jpg!"));
    }
    cb(undefined, true);
  },
});
