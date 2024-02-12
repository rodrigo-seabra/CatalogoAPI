const routerUser = require("express").Router();
const UserController = require("../controllers/UserController");

routerUser.post("/register", UserController.register);
routerUser.get("/checkUser", UserController.checkUser);
routerUser.post("/login", UserController.login);

module.exports = routerUser;
