const Joi = require("joi");

const productValidator = async (req, res, next) => {
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

  next();
};

module.exports = { productValidator };
