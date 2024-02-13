const routerUser = require("express").Router();
const UserController = require("../controllers/UserController");
import { imageUpload } from "../helpers/image-upload";

routerUser.post(
  "/register",
  imageUpload.single("image"),
  UserController.register
);
routerUser.get("/checkUser", UserController.checkUser);
routerUser.post("/login", UserController.login);

module.exports = routerUser;
