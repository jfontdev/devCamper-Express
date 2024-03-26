const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const mongoSanitize = require("express-mongo-sanitize")
const colors = require("colors");
const fileupload = require("express-fileupload")
const cookieParser = require("cookie-parser")
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
const reviews = require("./routes/reviews")
const auth = require("./routes/auth")
const users = require("./routes/users")
const path = require("path");

// Initialize express server with port and node enviroment
const app = express();

// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// Dev loggin middleware
if (NODE_ENV === "development") {
    app.use(morgan("dev"));
}

app.use(mongoSanitize())

// File uploading
app.use(fileupload());

// Set static folder
app.use(express.static(path.join(__dirname, "public")))

// Mount routers -> middleware
app.use("/api/v1/bootcamps", bootcamps);
app.use("/api/v1/courses", courses);
app.use("/api/v1/reviews", reviews);
app.use("/api/v1/auth", auth);
app.use("/api/v1/users", users);

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
