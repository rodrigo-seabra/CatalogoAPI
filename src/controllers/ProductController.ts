const ProductModel = require("../models/Product");
import { Request, Response } from "express";

const ObjectId = require("mongoose").Types.ObjectId;

const createUserToken = require("../helpers/create-user-token");
import { getToken } from "../helpers/get-token";
import { getUserByToken } from "../helpers/getUserByToken";
import { UserInterface } from "../Interface/UserInterface";
import { ProductInterface } from "../Interface/ProductInterface";

module.exports = class ProductController {
  static async create(req: Request, res: Response) {
    const token: string = getToken(req);
    let user: UserInterface;
    try {
        user = await getUserByToken(token);
    } catch (error) {
        res.status(401).json({ message: "Token inválido!" });
        return;
    }
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

    const product: ProductInterface = new ProductModel({
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
    const id: string = req.params.id;

    //checando se o valor é um object id válido
    if (!ObjectId.isValid(id)) {
      res.status(422).json({ message: "Id inválido" });
      return;
    }

    //check if pet exists
    const product: ProductInterface | null = await ProductModel.findOne({
      _id: id,
    });
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
    const product: ProductInterface | null = await ProductModel.findOne({
      _id: id,
    });
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
  static async UpdateProduct(req: Request, res: Response) {
    const id: string = req.params.id;
    const { modelo, categoria, marca, ano, descricao } = req.body;
    let image: string | undefined = undefined;
    const token: string = getToken(req);
    const user: UserInterface = await getUserByToken(token);

    //images upload

    const updatedData = { modelo, categoria, marca, ano, descricao, image }; // ficará os dados que serão atualizados dos pets durante esse processo

    //check if pet exists
    const Product: ProductInterface | null = await ProductModel.findOne({
      _id: id,
    });
    if (!Product) {
      res.status(404).json({ message: "Pet não encontrado!" }); //404 - recurso não existe
      return;
    }

    if (req.file) {
      image = req.file.filename;
    } else {
      updatedData.image = image;
    }
    if (Product.user._id.toString() !== user._id.toString()) {
      res.status(422).json({
        message:
          "Houve um problema ao processar a sua solicitação, tente novamente mais tarde!",
      });
      return;
    }
    //validations
    if (!modelo) {
      res.status(422).json({ message: "O modelo é obrigatório" });
      return;
    } else {
      updatedData.modelo = modelo;
    }

    if (!categoria) {
      res.status(422).json({ message: "A categoria é obrigatória" });
      return;
    } else {
      updatedData.categoria = categoria;
    }

    if (!marca) {
      res.status(422).json({ message: "A marca é obrigatória" });
      return;
    } else {
      updatedData.marca = marca;
    }

    if (!descricao) {
      res.status(422).json({ message: "A descricao é obrigatória" });
      return;
    } else {
      updatedData.descricao = descricao;
    }

    if (!ano) {
      res.status(422).json({ message: "O ano é obrigatório" });
      return;
    } else {
      updatedData.ano = ano;
    }

    await ProductModel.findByIdAndUpdate(id, updatedData);

    res.status(200).json({ message: "Pet atualizado com sucesso!" });
  }
};
