const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const userValidation = {};

userValidation.createUser = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

userValidation.loginUser = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

module.exports = userValidation;
