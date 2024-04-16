const Joi = require("joi");
const Product = require("../models/productModel");

const getAllProduct = async (req, res) => {
  try {
    const products = await Product.find();
    if (!products) {
      return res.status(400).json({ error: " no product yet plaese add" });
    }
    return res.status(200).json(products);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: `server error ` });
  }
};
const getProduct = async (req, res) => {
  try {
    const products = await Product.find({ owner: req.user._id });
    if (!products) {
      return res.status(400).json({ error: "somthing went wrong" });
    }
    return res.status(200).json(products);
  } catch (error) {
    console.log(error);
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
    console.log(error);
    return res.status(400).json({ error: `server error ` });
  }
};

const updateProduct = async (req, res) => {
  console.log(req.body);
  try {
    const productToBeUpdated = await Product.findById(req.body._id);
    if (!productToBeUpdated) {
      return res.status(400).json({
        error: "the product that you want update product do not exit",
      });
    }

    if (
      productToBeUpdated.owner.toString() !== req.user._id.toString() ||
      req.user.role !== "admin"
    ) {
      return res
        .status(401)
        .json({ error: "you do not have the auterization" });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.body._id,
      req.body,
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(400).json({
        error: "product is not updated sucssfully",
      });
    }
    return res.status(200).json(updatedProduct);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: `server error ` });
  }
};

const deletProduct = async (req, res) => {
  try {
    const productToBeDeleted = await Product.findById(req.body.id);

    if (!productToBeDeleted) {
      return res
        .status(400)
        .json({ error: "the product that you want delet do not exit" });
    }

    if (
      productToBeDeleted.owner.toString() !== req.user._id.toString() ||
      req.user.role !== "admin"
    ) {
      return res
        .status(401)
        .json({ error: "you do not have the authorization" });
    }

    const deletedProduct = await Product.deleteOne({ _id: req.body.id });
    if (!deletedProduct) {
      return res.status(400).json({
        error: "product is not deleted sucssfully",
      });
    }
    return res
      .status(200)
      .json({ message: "product deletedion was sucsessful" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: `server error ` });
  }
};

module.exports = {
  getAllProduct,
  getProduct,
  createProduct,
  updateProduct,
  deletProduct,
};
