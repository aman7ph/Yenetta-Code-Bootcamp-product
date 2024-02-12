const express = require("express");
const { productValidator } = require("../middleware/productValidator");
const router = express.Router();
const {
  getProduct,
  createProduct,
  updateProduct,
  deletProduct,
} = require("../controller/productController");

router.route("/").get(getProduct).post(productValidator, createProduct);
router.route("/:id").put(updateProduct).delete(deletProduct);

module.exports = router;
