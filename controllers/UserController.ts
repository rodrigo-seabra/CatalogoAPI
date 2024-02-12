const UserModel = require("../models/User");
import { UserInterface } from "../Interface/UserInterface";
import { ResInterface } from "../Interface/ResInterface";

//import bcrypt
const bcrypt = require("bcrypt");

//import jwt
const jwt = require("jsonwebtoken");

module.exports = class UserController {
  static async register(req: UserInterface, res: ResInterface) {
    const { name, email, phone, password, confirmpassword, CPF } = req.body;
    if (!name) {
      res.status(422).json({ message: "O nome é obrigatório!" }); //422 - requisição realizada porém o servidor não consegue processá-la
      return;
    }
    if (!CPF) {
      res.status(422).json({ message: "O CPF é obrigatório!" }); //422 - requisição realizada porém o servidor não consegue processá-la
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
    if (!confirmpassword) {
      res
        .status(422)
        .json({ message: "A senha de confirmaçãao é obrigatória!" }); //422 - requisição realizada porém o servidor não consegue processá-la
      return;
    }
    const userExists = await UserModel.findOne({ email: email });

    if (userExists) {
      res.status(422).json({
        message: "Por favor utilize outro e-mail",
      }); //422 - requisição realizada porém o servidor não consegue processá-la
      return;
    }
    const user: UserInterface = new UserModel({
      name,
      email,
      phone,
      password,
      CPF,
    });
    try {
      const newUser = await user.save();
      res
        .status(200)
        .json({ message: "User cadastrado com sucesso!", cpf: `${CPF}` });
    } catch (err) {
      res.status(500).json({ message: err });
    }
  }
  static async checkUser(req: UserInterface, res: ResInterface) {}

  static async login(req: UserInterface, res: ResInterface) {
    const { email, password } = req.body;

    //validations
    if (!email) {
      res.status(422).json({ message: "O email é obrigatório!" }); //422 - requisição realizada porém o servidor não consegue processá-la
      return;
    }
    if (!password) {
      res.status(422).json({ message: "A senha é obrigatória!" }); //422 - requisição realizada porém o servidor não consegue processá-la
      return;
    }

    //check if user exists - verificando se o user existe
    const user = await UserModel.findOne({ email: email });

    if (!user) {
      res.status(422).json({
        message: "Não há usuário cadastrado com esse e-mail",
      }); //422 - requisição realizada porém o servidor não consegue processá-la
      return;
    }

    res
      .status(200)
      .json({
        message: `ola ${user.name}, login realizado com sucesso`,
        user: `${user._id}`,
      });
  }
};
