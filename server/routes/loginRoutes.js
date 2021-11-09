const express = require("express");
const { validate } = require("express-validation");
const { loginRequestSchema } = require("../../schemas/userSchema");
require("dotenv").config();
const { loginUser } = require("../controllers/userController");

const router = express.Router();

router.post("/login", validate(loginRequestSchema), loginUser);

module.exports = router;
