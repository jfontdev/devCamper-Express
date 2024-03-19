const ErrorResponse = require("../utils/errorResponse");
const errorHandler = (err, req, res, next) => {
    let error = {...err}

    error.message = err.message;

    // Log to console for the developer
    console.log(err);

    // Mongoose bad ObjectID
    if (err.name === "CastError") {
        const message = `Bootcamp not found with id of ${err.value}`
        const statusCode = 404
        error = new ErrorResponse(message,statusCode)
    }

    // Duplicated key
    if (err.code === 11000){
        const message = `Duplicated value ${Object.values(err.keyValue)}`
        const statusCode = 400
        error = new ErrorResponse(message,statusCode)
    }

    // Validation errors
    if( err.name === "ValidationError"){
        const message = Object.values(err.errors).map(value => value.message)
        const statusCode = 400
        error = new ErrorResponse(message, statusCode)
    }

    res.status(error.statusCode || 500).json({success: false, error: error.message || "Server error"})
}

module.exports = errorHandler