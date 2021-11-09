const express = require("express");
require("dotenv").config();

const {
  getRobots,
  getRobotById,
  deleteRobotById,
} = require("../controllers/robotsController");

const router = express.Router();

router.get("/", getRobots);
router.get("/:idRobot", getRobotById);
router.delete("/delete/:idRobot", deleteRobotById);

module.exports = router;
