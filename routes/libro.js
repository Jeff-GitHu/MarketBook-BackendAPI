const express = require("express");
const ruta = express.Router();

const {
  getLibros,
  getLibroById,
  createLibro,
  updateLibro,
  deleteLibro,
  pagination,
} = require("../controllers/libro");

ruta.route("/").get(getLibros).post(createLibro);

ruta.route("/:id").get(getLibroById).put(updateLibro).delete(deleteLibro);

ruta.route("/pagination").post(pagination);

module.exports = ruta;
