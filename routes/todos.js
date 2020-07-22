const express = require("express");
const router = express.Router();
const {
  getTodos,
  addTodo,
  getOneTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/todoController");
const authorizeToken = require("../middleware/tokenAuth");

router.route("/").get(getTodos).post(authorizeToken, addTodo);
router
  .route("/:id")
  .get(getOneTodo)
  .put(authorizeToken, updateTodo)
  .delete(authorizeToken, deleteTodo);

module.exports = router;
