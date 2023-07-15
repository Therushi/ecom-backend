const asyncHandler = (fn) => async (req, res, next) => {
  try {
    const result = await fn(req, res, next);
    return result;
  } catch (error) {
    // Handle the global error
    if (error.name === "UnhandledPromiseRejectionError") {
      console.error(error);
      res.status(500).json({
        error: error.message,
      });
    } else if (error.name === "ValidationError") {
      // Handle Validation Error
      res.status(500).json({
        error: error.message,
      });
    } else {
      res.status(500).json({
        error: error.message,
      });
    }
  }
};

module.exports = asyncHandler;
