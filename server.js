const dotenv = require("dotenv");
const { response } = require("express");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const errorHandler = require("./middleware/error");

const connectDatabase = require("./config/db");

dotenv.config({
  path: "./config/config.env",
});

connectDatabase();

//Inicializacion de rutas
const libro = require("./routes/libro");
const author = require("./routes/author");
const user = require("./routes/user");

const app = express();
//para que el express reconozca los response de tipo json
app.use(express.json());
app.use(cors());

//#region Middlewares
// const loger = (req, res, next) =>{
//     console.log('Este request pasa por el Middleware')
//     next()
// }
//#endregion

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//process.env.NODE_ENV === "development" ? app.use(morgan("dev")) : "";

app.use("/api/Libro", libro);
app.use("/api/LibreriaAuthor", author);
app.use("/user", user);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log("Servidor se ejecuta en ambiente", process.env.NODE_ENV)
);

//error de inicio en la db
process.on("unhandleRejection", (err, promise) => {
  console.log("Errores", err.message);
  server.close(() => process.exit(1));
});
