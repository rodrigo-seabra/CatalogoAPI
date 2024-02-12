const routerUser = require("express").Router();
const UserController = require("../controllers/UserController");

routerUser.post("/register", UserController.register);

module.exports = routerUser;
