const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const todoValidation = {};

todoValidation.getTodoById = Joi.object({
  id: Joi.objectId().required(),
});

todoValidation.createTodo = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
});

todoValidation.updateTodo = Joi.object({
  id: Joi.objectId().required(),
  title: Joi.string().required(),
  description: Joi.string().required(),
  status: Joi.boolean().required(),
});

todoValidation.deleteTodo = Joi.object({
  id: Joi.objectId().required(),
});

module.exports = todoValidation;
