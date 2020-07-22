const createError = require("http-errors");
const User = require("../models/User");

const authorizeToken = async (req, res, next) => {
  const token = req.header("X-Auth-Token");
  try {
    const user = await User.findUserFromToken(token);
    if (!user) throw new createError.Unauthorized();
    else req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authorizeToken;
