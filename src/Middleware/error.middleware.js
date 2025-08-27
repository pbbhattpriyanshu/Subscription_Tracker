const errorMiddleware = (err, req, res, next) => {
  try {
    let error = { ...err };
    error.message = err.message;

    console.log(err); // debug log

    // Mongoose bad ObjectId
    if (err.name === "CastError") {
      const message = `Resource not found with id of ${err.value}`;
      error = new Error(message);
      error.statusCode = 404;
    }

    // Mongoose duplicate key
    if (err.code === 11000) {
      const message = `Duplicate field value entered`;
      error = new Error(message);
      error.statusCode = 400;
    }

    // Mongoose validation error
    if (err.name === "ValidationError") {
      const message = Object.values(err.errors).map((val) => val.message);
      error = new Error(message);
      error.statusCode = 400;
    }

    // Mongoose server error
    if (err.name === "MongoServerError") {
      const message = `Internal server error`;
      error = new Error(message);
      error.statusCode = 500;
    }

    // Default / unknown error
    if (!error.statusCode) {
      error = new Error(error.message || "Something went wrong");
      error.statusCode = 500;
    }

    // ✅ Send proper error response
    res.status(error.statusCode).json({
      success: false,
      message: error.message,
    });

  } catch (error) {
    // fallback in case error handler itself crashes
    next(error);
  }
};

export default errorMiddleware;
