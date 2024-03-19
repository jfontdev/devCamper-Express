const ErrorResponse = require("../utils/errorResponse");
const errorHandler = (err, req, res, next) => {
    let error = {...err}

    error.message = err.message;

    // Log to console for the developer
    console.log(err.stack.red);

    // Mongoose bad ObjectID
    if (err.name === "CastError") {
        const message = `Bootcamp not found with id of ${err.value}`
        const statusCode = 404
        error = new ErrorResponse(message,statusCode)
    }

    res.status(error.statusCode || 500).json({success: false, error: error.message || "Server error"})
}

module.exports = errorHandler