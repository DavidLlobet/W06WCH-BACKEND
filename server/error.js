const debug = require("debug")("robots:errors");

const notFoundErrorHandler = (req, res) => {
  res.status(404).json({ error: "Endpoint not found" });
};

const generalErrorHandler = (error, req, res, next) => {
  debug("Ha ocurrido un error: ", error.message);
  const message = error.code ? error.message : "Fatal error";
  res.status(error.code || 500).json({ error: message });
};

module.exports = {
  notFoundErrorHandler,
  generalErrorHandler,
};
