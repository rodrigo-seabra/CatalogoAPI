const routerUser = require("express").Router();
const UserController = require("../controllers/UserController");
import { imageUpload } from "../helpers/image-upload";

//middleware
const verifyToken = require("../helpers/verifyToken");

routerUser.post(
  "/register",
  imageUpload.single("image"),
  UserController.register
);
routerUser.post("/login", UserController.login);

routerUser.patch(
  "/edit/:id",
  verifyToken,
  imageUpload.single("image"),
  UserController.editUser
);

module.exports = routerUser;
