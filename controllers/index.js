const AppError = require("../utils/appError");
const conn = require("../services/db");

exports.getProductos = (req, res, next) => {
    conn.query("SELECT * FROM productos", function (err, data, fields) {
      if(err) return next(new AppError(err))
      res.status(200).json({
        status: "success",
        length: data?.length,
        data: data,
      });
    });
   };


   exports.createProducto = (req, res, next) => {
    if (!req.body) return next(new AppError("No nono form data found", 404));
    const values = [req.body.name, "pending"];
    conn.query(
      "INSERT INTO productos (id,nombre, existencia) VALUES(?)",
      [values],
      function (err, data, fields) {
        if (err) return next(new AppError(err, 500));
        res.status(201).json({
          status: "success",
          message: "todo created!",
        });
      }
    );
   };


   exports.getProducto = (req, res, next) => {
    if (!req.params.id) {
      return next(new AppError("No todo id found", 404));
    }
    conn.query(
      "SELECT * FROM productos WHERE id = ?",
      [req.params.id],
      function (err, data, fields) {
        if (err) return next(new AppError(err, 500));
        res.status(200).json({
          status: "success",
          length: data?.length,
          data: data,
        });
      }
    );
   };