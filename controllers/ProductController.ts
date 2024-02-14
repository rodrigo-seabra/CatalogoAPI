const ProductModel = require("../models/Product");
import { ResInterface } from "../Interface/ResInterface";

const createUserToken = require("../helpers/create-user-token");
import { getToken } from "../helpers/get-token";
import { getUserByToken } from "../helpers/getUserByToken";

//import jwt
const jwt = require("jsonwebtoken");

module.exports = class ProductController {
  static async create(req: any, res: ResInterface) {
    const token = getToken(req);
    const user = await getUserByToken(token);
    const { modelo, categoria, marca, ano, descricao } = req.body;
    let image = req.body;
    //images upload

    if (req.file) {
      image = req.file.filename;
    }
    //validations
    if (!modelo) {
      res.status(422).json({ message: "O modelo é obrigatório" });
      return;
    }

    if (!categoria) {
      res.status(422).json({ message: "A categoria é obrigatória" });
      return;
    }

    if (!marca) {
      res.status(422).json({ message: "A marca é obrigatória" });
      return;
    }

    if (!ano) {
      res.status(422).json({ message: "O ano é obrigatório" });
      return;
    }

    if (!descricao) {
      res.status(422).json({ message: "A descricao é obrigatória" });
      return;
    }

    const product = new ProductModel({
      modelo,
      marca,
      ano,
      categoria,
      descricao,
      image,
      user: {
        _id: user._id,
        name: user.name,
        CPF: user.CPF,
      },
    });
    try {
      const newproduct = await product.save();
      res
        .status(200)
        .json({ message: "Produto cadastrado com sucesso!", newproduct });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
};
