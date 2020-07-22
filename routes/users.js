const express = require("express");
const router = express.Router();
const {
  getUsers,
  addUser,
  getOneUser,
  updateUser,
  deleteUser,
  loginUser,
} = require("../controllers/userController");

router.route("/").get(getUsers);

router.route("/signup").post(addUser);

router.route("/login").post(loginUser);

router.route("/:id").get(getOneUser).put(updateUser).delete(deleteUser);

module.exports = router;
