const express = require("express");
const { getRobots, getRobotById } = require("../controllers/robotsController");

require("dotenv").config();
const router = express.Router();

router.get("/", getRobots);
router.get("/:idRobot", getRobotById);

module.exports = router;
