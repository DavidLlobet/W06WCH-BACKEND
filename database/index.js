const debug = require("debug")("robots:database");
const chalk = require("chalk");
const mongoose = require("mongoose");

const dataBase = (env) => {
  mongoose.connect(env, (error) => {
    if (error) {
      debug(chalk.red("No se ha podido iniciar la base de datos."));
      debug(chalk.red(error.message));
      return;
    }
    debug(chalk.green("Conectado a la base de datos"));
  });
};

module.exports = dataBase;
