const express = require("express");
const { productValidator } = require("../middleware/productValidator");
const { protect } = require("../middleware/autMiddleware");
const { adminAut } = require("../middleware/adminAutMiddleware");
const router = express.Router();
const {
  getAllProduct,
  getProduct,
  createProduct,
  updateProduct,
  deletProduct,
} = require("../controller/productController");

router
  .route("/")
  .get(protect, getProduct)
  .post(protect, productValidator, createProduct);
router.route("/:id").put(protect, updateProduct).delete(protect, deletProduct);
router.route("/getall").get(protect, adminAut, getAllProduct);

module.exports = router;
