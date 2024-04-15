const Joi = require("joi");
const Product = require("../models/productModel");

const getAllProduct = async (req, res) => {
  try {
    const allProducts = await Product.find();
    if (!allProducts) {
      return res.status(400).json({ error: "somthing went wrong" });
    }
    return res.status(200).json({ allProducts });
  } catch (error) {
    return res.status(400).json({ error: `server error ` });
  }
};
const getProduct = async (req, res) => {
  try {
    const products = await Product.find({ owner: req.user._id });
    if (!products) {
      return res.status(400).json({ error: "somthing went wrong" });
    }
    return res.status(200).json({ products });
  } catch (error) {
    console.log(err);
    return res.status(400).json({ error: `server error ` });
  }
};

const createProduct = async (req, res) => {
  try {
    const product = await Product.create({
      owner: req.user._id,
      name: req.body.name,
      price: req.body.price,
      quantity: req.body.quantity,
      description: req.body.description,
    });
    if (!product) {
      return res.status(400).json({ error: "product not saved" });
    }
    return res.status(200).json(product);
  } catch (error) {
    console.log(err);
    return res.status(400).json({ error: `server error ` });
  }
};

const updateProduct = async (req, res) => {
  const productToBeUpdated = await Product.findById(req.params.id);
  if (!productToBeUpdated) {
    res
      .status(400)
      .json({ error: "the product that you want update product do not exit" });
  }

  if (productToBeUpdated.owner.toString() !== req.user._id) {
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

  if (productToBeDeleted.owner.toString() !== req.user._id) {
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
