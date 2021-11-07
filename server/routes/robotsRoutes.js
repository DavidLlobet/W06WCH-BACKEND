const express = require("express");
const {
  getRobots,
  getRobotById,
  deleteRobotById,
} = require("../controllers/robotsController");

require("dotenv").config();
const router = express.Router();

router.get("/", getRobots);
router.get("/:idRobot", getRobotById);
router.delete("/delete/:idRobot", deleteRobotById);

module.exports = router;
