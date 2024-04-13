const Joi = require("joi");

const productValidator = async (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required(),
    quantity: Joi.number().positive().min(10).required(),
    description: Joi.string().required(),
  });

  const { error, value } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    res.status(400).json({ error: error.details.map((err) => err.message) });
  }

  next();
};

module.exports = { productValidator };
