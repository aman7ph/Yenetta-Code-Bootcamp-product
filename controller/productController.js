const Joi = require("joi");
const Product = require("../models/productModel");

const getAllProduct = async (req, res) => {
  try {
    const allProducts = await Product.find();
    res.status(200).json({ allProducts });
  } catch (err) {
    res.status(400).json({ err });
  }
};
const getProduct = async (req, res) => {
  try {
    const products = await Product.find({ owner: req.user.id });
    res.status(200).json({ products });
  } catch (err) {
    res.status(400).json({ err });
  }
};

const createProduct = async (req, res) => {
  const product = await Product.create({
    owner: req.user.id,
    product_name: req.body.product_name,
    product_price: req.body.product_price,
    product_quantity: req.body.product_quantity,
    product_description: req.body.product_description,
  });

  res.status(200).json(product);
};

const updateProduct = async (req, res) => {
  const productToBeUpdated = await Product.findById(req.params.id);
  if (!productToBeUpdated) {
    res
      .status(400)
      .json({ error: "the product that you want update product do not exit" });
  }

  if (productToBeUpdated.owner.toString() !== req.user.id) {
    res.status(401).json({ error: "you do not have the auterization" });
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json({ updatedProduct });
};

const deletProduct = async (req, res) => {
  const productToBeDeleted = await Product.findById(req.params.id);
  if (!productToBeDeleted) {
    res
      .status(400)
      .json({ error: "the product that you want delet do not exit" });
  }

  if (productToBeDeleted.owner.toString() !== req.user.id) {
    res.status(401).json({ error: "you do not have the auterization" });
  }

  const deletedProduct = await Product.deleteOne({ _id: req.params.id });
  res.status(200).json({ message: "product deletedion was sucsessful" });
};

module.exports = {
  getAllProduct,
  getProduct,
  createProduct,
  updateProduct,
  deletProduct,
};
