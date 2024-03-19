const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/error")
// Load env vars

dotenv.config({ path: "./config/config.env" });
const { PORT, NODE_ENV } = process.env;

// Connect to the database
connectDB();

// Route files
const bootcamps = require("./routes/bootcamps");

// Initialize express server with port and node enviroment
const app = express();

// Body parser
app.use(express.json());

// Dev loggin middleware
if (NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Mount routers -> middleware
app.use("/api/v1/bootcamps", bootcamps);

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
