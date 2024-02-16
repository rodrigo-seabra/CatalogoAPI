const UserModel = require("../models/User");
import { UserInterface } from "../Interface/UserInterface";
import { Request, Response } from "express";

const createUserToken = require("../helpers/create-user-token");
import { getToken } from "../helpers/get-token";
import { getUserByToken } from "../helpers/getUserByToken";
//import bcrypt
const bcrypt = require("bcrypt");

//import jwt
const jwt = require("jsonwebtoken");

module.exports = class UserController {
  static async register(req: Request, res: Response) {
    const { name, email, phone, password, confirmpassword, CPF } = req.body;
    let image: string | undefined = undefined;

    if (req.file) {
      image = req.file.filename;
    }

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

    //validando as senhas
    if (password !== confirmpassword) {
      res.status(422).json({
        message: "A senha e a confirmação de senha precisam ser iguais!",
      }); //422 - requisição realizada porém o servidor não consegue processá-la
      return;
    }
    const userExists: UserInterface | null = await UserModel.findOne({
      email: email,
    });

    if (userExists) {
      res.status(422).json({
        message: "Por favor utilize outro e-mail",
      }); //422 - requisição realizada porém o servidor não consegue processá-la
      return;
    }
    const user: UserInterface = new UserModel({
      name: String,
      email: String,
      phone: String,
      password: String,
      CPF: String,
      image: String,
    });

    try {
      const newUser = await user.save();
      await createUserToken(newUser, req, res);
    } catch (err) {
      res.status(500).json({ message: err });
    }
  }

  static async login(req: Request, res: Response) {
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
    const user: UserInterface | null = await UserModel.findOne({
      email: email,
    });

    if (!user) {
      res.status(422).json({
        message: "Não há usuário cadastrado com esse e-mail",
      }); //422 - requisição realizada porém o servidor não consegue processá-la
      return;
    }

    await createUserToken(user, req, res);
  }
  static async editUser(req: Request, res: Response) {
    const id: string = req.params.id;
    //check if user exists
    const token: string = getToken(req);
    const user: UserInterface = await getUserByToken(token);
    const { name, email, phone, password, confirmpassword } = req.body;

    if (req.file) {
      user.image = req.file.filename;
    }

    //VALIDATIONS
    if (!name) {
      res.status(422).json({ message: "O nome é obrigatório!" });
      return;
    }

    user.name = name;

    if (!email) {
      res.status(422).json({ message: "O e-mail é obrigatório!" });
      return;
    }

    // check if user exists
    const userExists: UserInterface | null = await UserModel.findOne({
      email: email,
    });

    if (user.email !== email && userExists) {
      res.status(422).json({ message: "Por favor, utilize outro e-mail!" });
      return;
    }

    user.email = email;
    if (!phone) {
      res.status(422).json({ message: "O telefone é obrigatório!" }); //422 - requisição realizada porém o servidor não consegue processá-la
      return;
    }

    if (password != confirmpassword) {
      res.status(422).json({ message: "As senhas não conferem" }); //422 - requisição realizada porém o servidor não consegue processá-la
      return;
    }
    // ou seja, se o user mandou a senha certa e deseja realmente mudá-la
    else if (password === confirmpassword && password != null) {
      user.password = password;
    }

    //try catch que valida se as alterações deram certo ou errado
    try {
      //returns user updated data

      const updatedUser = await User.findByIdAndUpdate(
        { _id: user._id },
        { $set: user }, //os dados que serão atualizados
        { new: true } // parametros para atualizar os dados com sucesso
      );

      res.status(200).json({ message: "Usuário atualizado com sucesso!" });
    } catch (error) {
      res.status(500).json({ message: error });
    }

    console.log(user);
  }
};
