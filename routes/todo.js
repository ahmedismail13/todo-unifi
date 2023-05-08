const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

const todoController = require("../controllers/todo");

router.get("/", auth, todoController.getAllTodos);

router.get("/:id", auth, todoController.getTodoById);

router.post("/", auth, todoController.createTodo);

router.put("/:id", auth, todoController.updateTodo);

router.delete("/:id", auth, todoController.deleteTodo);

module.exports = router;
