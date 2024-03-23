const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const fileupload = require("express-fileupload")
const connectDB = require("./config/db");
const errorHandler = require("./middleware/error")
// Load env vars

dotenv.config({path: "./config/config.env"});
const {PORT, NODE_ENV} = process.env;

// Connect to the database
connectDB();

// Route files
const bootcamps = require("./routes/bootcamps");
const courses = require("./routes/courses")
const auth = require("./routes/auth")
const path = require("path");

// Initialize express server with port and node enviroment
const app = express();

// Body parser
app.use(express.json());

// Dev loggin middleware
if (NODE_ENV === "development") {
    app.use(morgan("dev"));
}

// File uploading
app.use(fileupload());

// Set static folder
app.use(express.static(path.join(__dirname, "public")))

// Mount routers -> middleware
app.use("/api/v1/bootcamps", bootcamps);
app.use("/api/v1/courses", courses);
app.use("/api/v1/auth", auth);

app.use(errorHandler);

const server = app.listen(
    PORT,
    console.log(`Server running in ${NODE_ENV} mode on port ${PORT}`.yellow.bold)
);

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
    console.log(`Error: ${err.message}`.red);
    // Close server & exit process
    server.close(() => process.exit(1));
});
