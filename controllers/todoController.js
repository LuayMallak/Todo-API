const mongoose = require("mongoose");
const createError = require("http-errors");

const Todo = require("../models/Todo");

exports.getTodos = async (req, res, next) => {
  try {
    const todos = await Todo.find();
    res.status(200).send(todos);
  } catch (err) {
    next(err);
  }
};

exports.addTodo = async (req, res, next) => {
  try {
    const newTodo = new Todo({ ...req.body });
    await newTodo.save();
    res.status(201).send(newTodo);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.getOneTodo = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      throw new createError.NotFound();
    const todo = await Todo.findById(req.params.id);
    res.status(200).send(todo);
  } catch (err) {
    next(err);
  }
};

exports.updateTodo = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      throw new createError.NotFound();
    const todo = await Todo.findByIdAndUpdate(req.params.id, { ...req.body });
    if (!todo.id) throw new createError.NotFound();
    res.status(200).send(todo);
  } catch (err) {
    next(err);
  }
};

exports.deleteTodo = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      throw new createError.NotFound();
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
    res.status(204).send("Todo is deleted");
  } catch (err) {
    next(err);
  }
};
