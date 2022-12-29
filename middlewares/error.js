import ErrorResponse from "../utils/errorResponse.js";

function errorHandler(err, req, res, next) {
  let error = { ...err };

  error.message = err.message;

  // log err to console
  console.log(err);

  // mongoose bad object id
  if (err.name === "CastError") {
    const message = `Resource not found with id: ${err.value}`;
    error = new ErrorResponse(message, 404);
  }

  // mongoose duplicate key
  if (err.code === 11000) {
    //the duplicate key err has no name
    const message = `Duplicate field value entered: ${JSON.stringify(
      err.keyValue
    )}`;
    error = new ErrorResponse(message, 400);
  }

  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((value) => value.message);
    error = new ErrorResponse(message, 400);
  }

  res
    .status(error.statusCode || 500)
    .json({ message: error.message || "Server error" });
}

export default errorHandler;
