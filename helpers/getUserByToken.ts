const jwt = require("jsonwebtoken");
const UserModel = require("../models/User");

//get user jwt token
export const getUserByToken = async (token: string) => {
  if (!token) {
    return Response.json({ message: "Acesso negado!" }); //401 = indica um problema nas credenciais de acesso à página
  }
  const decoded = jwt.verify(token, "010806Catalogo");

  const id = decoded.id;

  const user = await UserModel.findById(id);

  return user;
};
