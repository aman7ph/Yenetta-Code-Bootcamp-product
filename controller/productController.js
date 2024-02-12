const Joi = require("joi");
const Product = require("../models/productModel");

const getProduct = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ products });
  } catch (err) {
    res.status(400).json({ err });
  }
};

const createProduct = async (req, res) => {
  const schema = Joi.object({
    product_name: Joi.string().required(),
    product_price: Joi.number().required(),
    product_quantity: Joi.number().positive().min(10).required(),
    product_description: Joi.string().required(),
  });

  const { error, value } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    res.status(400).json({ error: error.details.map((err) => err.message) });
  }

  const product = await Product.create({
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

  const deletedProduct = await Product.deleteOne({ _id: req.params.id });
  res.status(200).json({ message: "product deletedion was sucsessful" });
};

module.exports = {
  getProduct,
  createProduct,
  updateProduct,
  deletProduct,
};
