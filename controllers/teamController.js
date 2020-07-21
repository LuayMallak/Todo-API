const mongoose = require("mongoose");
const createError = require("http-errors");

const Team = require("../models/Team");

exports.getTeams = async (req, res, next) => {
  try {
    const teams = await Team.find().populate("todos", "-_id -__v");
    res.status(200).send(teams);
  } catch (err) {
    next(err);
  }
};

exports.addTeam = async (req, res, next) => {
  try {
    const newTeam = new Team({ ...req.body });
    await newTeam.save();
    res.status(201).send(newTeam);
  } catch (err) {
    next(err);
  }
};

exports.getOneTeam = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      throw new createError.NotFound();
    const team = await Team.findById(req.params.id);
    res.status(200).send(team);
  } catch (err) {
    next(err);
  }
};

exports.updateTeam = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      throw new createError.NotFound();
    const team = await Team.findByIdAndUpdate(req.params.id, { ...req.body });
    if (!team.id) throw new createError.NotFound();
    res.status(200).send(team);
  } catch (err) {
    next(err);
  }
};

exports.deleteTeam = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      throw new createError.NotFound();
    const deletedTeam = await Team.findByIdAndDelete(req.params.id);
    res.status(204).send("Team is deleted");
  } catch (err) {
    next(err);
  }
};
