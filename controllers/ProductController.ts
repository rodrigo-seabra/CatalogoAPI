const ProductModel = require("../models/Product");
import { Request, Response } from "express";

const ObjectId = require("mongoose").Types.ObjectId;

const createUserToken = require("../helpers/create-user-token");
import { getToken } from "../helpers/get-token";
import { getUserByToken } from "../helpers/getUserByToken";
import { UserInterface } from "../Interface/UserInterface";

module.exports = class ProductController {
  static async create(req: Request, res: Response) {
    const token: string = getToken(req);
    const user: any = await getUserByToken(token);
    const { modelo, categoria, marca, ano, descricao } = req.body;
    let image: string | undefined = undefined;
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
  static async getAll(req: Request, res: Response) {
    const product = await ProductModel.find().sort("-createdAt"); //sort é o método de ordenação, o menos (-) significa que ele vai pegar do mais novo para o mais velho

    res.status(200).json({ product: product });
  }

  static async getProductById(req: Request, res: Response) {
    const id = req.params.id;

    //checando se o valor é um object id válido
    if (!ObjectId.isValid(id)) {
      res.status(422).json({ message: "Id inválido" });
      return;
    }

    //check if pet exists
    const product = await ProductModel.findOne({ _id: id });
    if (!product) {
      res.status(404).json({ message: "product não encontrado!" }); //404 - recurso não existe
      return;
    }
    res.status(200).json({
      product: product,
    });
  }

  static async removeProductById(req: Request, res: Response) {
    const id: string = req.params.id;
    //checando se o valor é um object id válido
    if (!ObjectId.isValid(id)) {
      res.status(422).json({ message: "Id inválido" });
      return;
    }

    //check if pet exists
    const product: any = await ProductModel.findOne({ _id: id });
    if (!product) {
      res.status(404).json({ message: "produto não encontrado!" }); //404 - recurso não existe
      return;
    }

    //check if logged in user registered the pet
    const token: string = getToken(req);
    const user: UserInterface = await getUserByToken(token);

    if (product.user._id.toString() !== user._id.toString()) {
      res.status(422).json({
        message:
          "Houve um problema ao processar a sua solicitação, tente novamente mais tarde!",
      });
      return;
    }
    await ProductModel.findOneAndDelete({ _id: id });
    res.status(200).json({ message: "produto removido com sucesso!" });
  }
};
