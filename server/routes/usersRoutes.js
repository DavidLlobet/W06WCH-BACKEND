const express = require("express");
const User = require("../../database/models/users");
const router = express.Router();
const bcrypt = require("bcrypt");

router.get("/", async (req, res, next) => {
  await User.create({
    name: "Luis",

    username: "luis",

    password: await bcrypt.hash("contra", 10),
  });
  res.json("Papanatas");
});

module.exports = router;
