const mongoos = require("mongoose");
const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema(
  {
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
