//Write a mongoose model for todo

const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    minlength: 3,
    maxlength: 50,
    required: true,
  },
  description: {
    type: String,
    minlength: 3,
    maxlength: 255,
    required: true,
  },
  status: {
    type: Boolean,
    default: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
