const todoService = {};
const TodoModel = require("../models/todo");
const RequestError = require("../utils/request_error");

todoService.getAllTodos = async (userId) => {
  const todos = await TodoModel.find({
    user: userId,
  });

  return todos;
};

todoService.getTodoById = async (id, userId) => {
  const todo = await TodoModel.findOne({
    _id: id,
    user: userId,
  });

  if (!todo) throw new RequestError("Todo not found", 404);

  return todo;
};

todoService.createTodo = async ({ title, description, status }, userId) => {
  const todo = await TodoModel.create({
    title,
    description,
    status,
    user: userId,
  });

  return todo;
};

todoService.updateTodo = async (id, { title, description, status }, userId) => {
  const todo = await TodoModel.findOne({
    _id: id,
    user: userId,
  });

  if (!todo) throw new RequestError("Todo not found", 404);

  todo.title = title;
  todo.description = description;
  todo.status = status;

  await todo.save();

  return todo;
};

todoService.deleteTodo = async (id, userId) => {
  const todo = await TodoModel.findOne({
    _id: id,
    user: userId,
  });

  if (!todo) throw new RequestError("Todo not found", 404);

  await todo.deleteOne();

  return todo;
};

module.exports = todoService;
