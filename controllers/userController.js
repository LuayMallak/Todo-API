const mongoose = require("mongoose");
const createError = require("http-errors");

const User = require("../models/User");

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (err) {
    next(err);
  }
};

exports.addUser = async (req, res, next) => {
  try {
    const newUser = new User({ ...req.body });
    await newUser.save();
    res.status(201).send(newUser);
  } catch (err) {
    next(err);
  }
};

exports.getOneUser = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      throw new createError.NotFound();
    const user = await User.findById(req.params.id);
    res.status(200).send(user);
  } catch (err) {
    next(err);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      throw new createError.NotFound();
    const user = await User.findByIdAndUpdate(req.params.id, { ...req.body });
    if (!user.id) throw new createError.NotFound();
    res.status(200).send(user);
  } catch (err) {
    next(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      throw new createError.NotFound();
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    res.status(204).send("User is deleted");
  } catch (err) {
    next(err);
  }
};

exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const loginUser = await User.findOne({ email });
    if (!loginUser) throw new createError.Unauthorized("wrong email");
    const isCorrect = await loginUser.checkPassword(password);
    if (!isCorrect) throw new createError.Unauthorized("wrong password");

    const token = await loginUser.createToken();
    res.header("X-Auth-Token", token).status(200).send("You are logged-in");
  } catch (err) {
    next(err);
  }
};
