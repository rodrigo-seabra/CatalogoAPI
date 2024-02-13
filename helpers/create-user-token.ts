import { ResInterface } from "../Interface/ResInterface";

const jwt = require("jsonwebtoken");

const createUserToken = async (user: any, req: any, res: ResInterface) => {
  const token = jwt.sign(
    // payload data
    {
      name: user.name,
      id: user._id,
    },
    "010806Catalogo"
  );

  // return token
  res.status(200).json({
    message: "Você está autenticado!",
    token: token,
    userId: user._id,
    cpf: user.CPF,
  });
};

module.exports = createUserToken;
