const RequestError = require("../utils/request_error");

const errorHandler = (err, req, res, next) => {
  console.error(err);

  if (err instanceof RequestError)
    return res.status(err.statusCode).json({ error: err.message });

  // Handle other errors
  return res.status(500).json({ error: "Internal server error." });
};

module.exports = errorHandler;
