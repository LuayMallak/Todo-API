const express = require("express");
const router = express.Router();
const {
  getTodos,
  addTodo,
  getOneTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/todoController");

router.route("/").get(getTodos).post(addTodo);
router.route("/:id").get(getOneTodo).put(updateTodo).delete(deleteTodo);

module.exports = router;
