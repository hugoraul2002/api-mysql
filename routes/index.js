const express = require("express");
const controllers = require("../controllers");
const router = express.Router();

router.route("/productos").get(controllers.getProductos).post(controllers.createProducto);
router
 .route("/:id")
 .get(controllers.getProducto);
module.exports = router;