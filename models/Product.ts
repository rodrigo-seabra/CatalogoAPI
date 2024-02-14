const conn = require("../db/conn");
const { Schema } = require("mongoose");

const Product = conn.model(
  "Product",
  new Schema(
    {
      modelo: {
        type: String,
        required: true,
      },
      categoria: {
        type: String,
        required: true,
      },
      ano: {
        type: String,
        required: true,
      },
      image: {
        type: String,
      },
      marca: {
        type: String,
        required: true,
      },
      descricao: {
        type: String,
        required: true,
      },
      user: Object, //inserido dados do user aqui - obs não estou fazendo relacionamento e sim inserindo os dados mesmo
    },
    { timestamps: true } //serve para criar dois dados, como as duas colunas do sql para saber a data de criação e a de atualização
  )
);

module.exports = Product;
