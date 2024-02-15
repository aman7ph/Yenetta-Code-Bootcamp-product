const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "User",
    },
    product_name: {
      type: String,
    },
    product_price: {
      type: Number,
    },
    product_quantity: {
      type: Number,
    },
    product_description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
