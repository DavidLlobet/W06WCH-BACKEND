const { Schema, model } = require("mongoose");

const robotSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  characteristics: {
    speed: {
      type: Number,
      required: true,
      min: 0,
      max: 10,
    },
    stamina: {
      type: Number,
      required: true,
      min: 0,
      max: 0,
    },
    creationDate: {
      type: Number,
      required: true,
    },
  },
});

const Robot = model("robot", robotSchema, "robots");

module.exports = Robot;
