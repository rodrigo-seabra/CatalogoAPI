const mongoose = require("mongoose");
require("dotenv").config();

async function main() {
  await mongoose.connect(process.env.DBCONN);
  console.log("Conectou ao mongose!");
}

main().catch((err) => console.log(err));

module.exports = mongoose;
