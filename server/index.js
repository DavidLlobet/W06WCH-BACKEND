const chalk = require("chalk");
const debug = require("debug")("robots:server");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { notFoundErrorHandler, generalErrorHandler } = require("./error");
const robotsRoutes = require("./routes/robotsRoutes");
const loginRoutes = require("./routes/loginRoutes");
const { validate } = require("express-validation");
const userValidation = require("./schemas/userSchema");

const initializeServer = (port) => {
   new Promise ((resolve, reject) => {
const server = app.listen(port, () => {
  debug(chalk.yellow(`Escuchando en el puerto ${port}`));
  resolve(server);
});
  
  server.on("error", (error) => {
    debug(chalk.red("Ha habido un error al iniciar el servidor."));
    if (error.code === "EADDRINUSE") {
      debug(chalk.red(`El puerto ${port} está en uso.`));
    }
    reject();
  });
  server.on("close", () => {
    debug(chalk.yellow("Servidor express desconectado"))
  })
});

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.use("/robots", robotsRoutes);
// app.use("/users", usersRoutes);
app.use("/user", validate(userValidation, {}, {}), loginRoutes);

app.use(notFoundErrorHandler);
app.use(generalErrorHandler);

module.exports = { initializeServer, app }