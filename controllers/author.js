const ErrorResponse = require("../helper/errorResponse");
const Author = require("../models/Author");

exports.createAuthor = async (req, res, next) => {
  try {
    const authorData = await Author.create(req.body);
    res.status(200).json({
      status: 200,
      data: authorData,
    });
  } catch (err) {
    next(new ErrorResponse("No es posible crear el autor " + err.message, 404));
  }
};

exports.getAuthor = async (req, res, next) => {
  try {
    const authorList = await Author.find();
    res.status(200).json(authorList);
  } catch (err) {
    next(
      new ErrorResponse("No se pudo procesar el request " + err.message, 404)
    );
  }
};

exports.getAuthorById = async (req, res, next) => {
  try {
    const author = await Author.findById(req.params.id);
    if (!author) {
      //error por si no existe
      return next(
        new ErrorResponse(
          "El autor no existe en la db con este id " + req.params.id,
          404
        )
      );
    }
    res.status(200).json(author);
  } catch (err) {
    //Error por un mal formato
    //Pasar el error al Middleware
    //next(err);
    //Pasar el error al Middleware con mensaje personalizado
    next(
      new ErrorResponse("El autor no existe con este id " + req.params.id, 404)
    );
    //Forma basica de error.
    // res.status(400).json({
    //   status: 400,
    //   message: err,
    // });
  }
};

exports.updateAuthor = async (req, res, next) => {
  try {
    const authorUpdate = await Author.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    if (!authorUpdate) {
      return next(
        new ErrorResponse(
          "El autor no existe en la db con este id " + req.params.id,
          404
        )
      );
    }
    res.status(200).json({ status: 200, data: authorUpdate });
  } catch (err) {
    next(
      new ErrorResponse("El autor no existe con este id " + req.params.id, 404)
    );
  }
};

exports.deleteAuthor = async (req, res, next) => {
  try {
    const authorDelete = await Author.findByIdAndDelete(req.params.id);
    if (!authorDelete) {
      return next(
        new ErrorResponse(
          "El autor no existe en la db con este id " + req.params.id,
          404
        )
      );
    }
    res.status(200).json({ status: 200 });
  } catch (err) {
    next(
      new ErrorResponse("El autor no existe con este id " + req.params.id, 404)
    );
  }
};
