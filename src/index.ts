const express = require("express");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 5000;
//configuração da resposta em json
app.use(express.json()); //nao precisa do url encoded pois só irá se comunicar em json mesmo

//Solve cors - resolvendo o problema de cors
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

//public folder for images - pasta publica para imagens
app.use(express.static("public"));
app.use("/public", express.static("public"));

const UserRoutes = require("../routes/UserRoutes");
const ProductRoutes = require("../routes/ProductRoutes");

app.use("/users", UserRoutes); //rotas de user
app.use("/product", ProductRoutes); //rotas de produtos

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
