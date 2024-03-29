const express = require("express");
const router = express.Router();
const {
  getProduct,
  createProduct,
  updateProduct,
  deletProduct,
} = require("../controller/productController");

router.route("/").get(getProduct).post(createProduct);
router.route("/:id").put(updateProduct).delete(deletProduct);

module.exports = router;
