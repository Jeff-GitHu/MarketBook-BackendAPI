const express = require("express");
const route = express.Router();

const { createAuthor, getAuthor, getAuthorById, updateAuthor, deleteAuthor } = require("../controllers/author");

route
    .route("/")
    .post(createAuthor)
    .get(getAuthor)

route
    .route("/:id")
    .get(getAuthorById)
    .put(updateAuthor)
    .delete(deleteAuthor)

module.exports = route;
