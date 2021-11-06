const express = require("express");
const { getRobots } = require("../controllers/robotsController");

const router = express.Router();

router.get("/", getRobots);

module.exports = router;
