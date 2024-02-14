const routerProduct = require("express").Router();
const ProductController = require("../controllers/ProductController");
import { imageUpload } from "../helpers/image-upload";

routerProduct.post(
  "/create",
  imageUpload.single("image"),
  ProductController.create
);

module.exports = routerProduct;
