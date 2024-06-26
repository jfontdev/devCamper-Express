const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const mongoSanitize = require("express-mongo-sanitize")
const helmet = require("helmet")
const xss = require("xss-clean")
const rateLimit = require("express-rate-limit")
const hpp = require("hpp")
const cors = require("cors")
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

// Set security headers
app.use(helmet());

// Prevent XSS tags
app.use(xss())

// Rate limiting
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 mins
    max: 100
})

app.use(limiter);

// Prevent http param pollution
app.use(hpp())

// Enable cors
app.use(cors())

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
