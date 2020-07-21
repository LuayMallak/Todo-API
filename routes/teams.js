const express = require("express");
const router = express.Router();
const {
  getTeams,
  addTeam,
  getOneTeam,
  updateTeam,
  deleteTeam,
} = require("../controllers/teamController");

router.route("/").get(getTeams).post(addTeam);
router.route("/:id").get(getOneTeam).put(updateTeam).delete(deleteTeam);

module.exports = router;
