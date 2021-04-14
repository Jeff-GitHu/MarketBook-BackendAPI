const ErrorResponse = require("../helper/errorResponse");
const Libro = require("../models/Libro");

exports.getLibros = async (req, res, next) => {
  try {
    const libroList = await Libro.find();
    if (!libroList) {
      return next(
        new ErrorResponse("No se pudo encontrar datos" + err.message, 400)
      );
    }

    res.status(200).json(libroList);
  } catch (err) {
    next(
      new ErrorResponse("No se pudo procesar el request" + err.message, 400)
    );
  }
};

exports.getLibroById = async (req, res, next) => {
  try {
    const libro = await Libro.findById(req.params.id);
    if (!libro) {
      return next(new ErrorResponse("No se pudo encontrar el libro", 400));
    }
    res.status(200).json({ status: 200, data: libro });
  } catch (err) {
    next(
      new ErrorResponse("No se pudo procesar el request " + err.message, 400)
    );
  }
};

exports.createLibro = async (req, res, next) => {
  try {
    const libroData = await Libro.create(req.body);
    res.status(200).json({ status: 200, data: libroData });
  } catch (err) {
    next(
      new ErrorResponse("No se pudo procesar el request" + err.message, 400)
    );
  }
};

exports.updateLibro = async (req, res, next) => {
  try {
    const libroUpdate = await Libro.findByIdAndUpdate(req.params.id, req.body);
    if (!libroUpdate) {
      return next(
        new ErrorResponse(
          "El libro no existe en la db con este id" + req.params.id,
          400
        )
      );
    }
    res.status(200).json({ status: 200, data: libroUpdate });
  } catch (err) {
    next(
      new ErrorResponse("No se pudo procesar el request" + err.message, 400)
    );
  }
};

exports.deleteLibro = async (req, res, next) => {
  try {
    const libroDelete = await Libro.findByIdAndDelete(req.params.id);
    if (!libroDelete) {
      return next(
        new ErrorResponse(
          "El libro no existe en la db con este id" + req.params.id,
          400
        )
      );
    }
    res.status(200).json({ status: 200 });
  } catch (err) {
    next(
      new ErrorResponse("No se pudo procesar el request" + err.message, 400)
    );
  }
};

exports.pagination = async (req, res, next) => {
  try {
    const sort = req.body.sort;
    const sortDirection = req.body.sortDirection;
    const page = parseInt(req.body.page);
    const pageSize = parseInt(req.body.pageSize);

    let filterValue = "";
    let filterProperty = "";
    let libros = [];

    let totalRows = 0;

    if (req.body.filterValue) {
      //filterValue = {valor:"", propiedad: ""}

      filterValue = req.body.filterValue.valor;
      filterProperty = req.body.filterValue.propiedad;
      //i para que busque por todo, no por mayusculas y minusculas
      libros = await Libro.find({
        [filterProperty]: new RegExp(filterValue, "i"),
      })
        .sort({ [sort]: sortDirection })
        .skip((page - 1) * pageSize)
        .limit(pageSize);

      totalRows = await Libro.find({
        [filterProperty]: new RegExp(filterValue, "i"),
      }).count();
    } else {
      //porque no hay ninguna condicion
      libros = await Libro.find()
        .sort({ [sort]: sortDirection })
        .skip((page - 1) * pageSize)
        .limit(pageSize);

      totalRows = await Libro.find().count();
    }

    const pagesQuantity = Math.ceil(totalRows / pageSize);

    res.status(200).json({
      status: 200,
      pageSize,
      page,
      sort,
      sortDirection,
      pagesQuantity,
      totalRows,
      data: libros,
    });
  } catch (err) {
    next(
      new ErrorResponse("No se pudo procesar el request" + err.message, 400)
    );
  }
};
