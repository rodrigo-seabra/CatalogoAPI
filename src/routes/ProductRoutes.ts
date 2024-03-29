const routerProduct = require("express").Router();
const ProductController = require("../controllers/ProductController");
import { imageUpload } from "../helpers/image-upload";

const verifyToken = require("../helpers/verifyToken");

routerProduct.post(
  "/create",
  imageUpload.single("image"),
  ProductController.create
);
routerProduct.get("/getall", ProductController.getAll);
routerProduct.get("/:id", ProductController.getProductById);
routerProduct.delete("/:id", verifyToken, ProductController.removeProductById);
routerProduct.patch(
  "/edit/:id",
  verifyToken,
  imageUpload.single("image"),
  ProductController.UpdateProduct
);

module.exports = routerProduct;
