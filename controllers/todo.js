const todoService = require("../services/todo");
const todoValidation = require("../validations/todo");
const RequestError = require("../utils/request_error");

const todoController = {};

todoController.getAllTodos = async (req, res, next) => {
  try {
    const { _id: userId } = req.user;
    const todos = await todoService.getAllTodos(userId);

    return res.status(200).send(todos);
  } catch (error) {
    next(error);
  }
};

todoController.getTodoById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { _id: userId } = req.user;

    const { error } = todoValidation.getTodoById.validate({ id });

    if (error) throw new RequestError(error.details[0].message, 400);

    const todo = await todoService.getTodoById(id, userId);

    return res.status(200).send(todo);
  } catch (error) {
    next(error);
  }
};

todoController.createTodo = async (req, res, next) => {
  try {
    const { title, description, status } = req.body;
    const { _id: userId } = req.user;

    const { error } = todoValidation.createTodo.validate({
      title,
      description,
    });

    if (error) throw new RequestError(error.details[0].message, 400);

    const todo = await todoService.createTodo(
      {
        title,
        description,
        status,
      },
      userId
    );

    return res.status(201).send(todo);
  } catch (error) {
    next(error);
  }
};

todoController.updateTodo = async (req, res, next) => {
  try {
    const { title, description, status } = req.body;
    const { id } = req.params;
    const { _id: userId } = req.user;

    const { error } = todoValidation.updateTodo.validate({
      id,
      title,
      description,
      status,
    });

    if (error) throw new RequestError(error.details[0].message, 400);

    const todo = await todoService.updateTodo(
      id,
      {
        title,
        description,
        status,
      },
      userId
    );

    return res.status(200).send(todo);
  } catch (error) {
    next(error);
  }
};

todoController.deleteTodo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { _id: userId } = req.user;

    const { error } = todoValidation.deleteTodo.validate({ id });

    if (error) throw new RequestError(error.details[0].message, 400);

    await todoService.deleteTodo(id, userId);

    return res.status(204).send();
  } catch (error) {
    next(error);
  }
};

module.exports = todoController;
