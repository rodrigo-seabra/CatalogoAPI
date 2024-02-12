const UserModel = require("../models/User");

//import bcrypt
const bcrypt = require("bcrypt");

//import jwt
const jwt = require("jsonwebtoken");

module.exports = class UserController {
  static async register(req: any, res: any) {
    const { name, email, phone, password, confirmpassword } = req.body;
    if (!name) {
      res.status(422).json({ message: "O nome é obrigatório!" }); //422 - requisição realizada porém o servidor não consegue processá-la
      return;
    }

    if (!email) {
      res.status(422).json({ message: "O email é obrigatório!" }); //422 - requisição realizada porém o servidor não consegue processá-la
      return;
    }
    if (!phone) {
      res.status(422).json({ message: "O telefone é obrigatório!" }); //422 - requisição realizada porém o servidor não consegue processá-la
      return;
    }
    if (!password) {
      res.status(422).json({ message: "A senha é obrigatória!" }); //422 - requisição realizada porém o servidor não consegue processá-la
      return;
    }

    const userExists = await UserModel.findOne({ email: email });

    if (userExists) {
      res.status(422).json({
        message: "Por favor utilize outro e-mail",
      }); //422 - requisição realizada porém o servidor não consegue processá-la
      return;
    }
    const user: any = new UserModel({
      name,
      email,
      phone,
      password,
    });
    try {
      const newUser = await user.save();
      res.status(200).json({ message: "user cadastrado com sucesso!" });
    } catch (err) {
      res.status(500).json({ message: err });
    }
  }
};
