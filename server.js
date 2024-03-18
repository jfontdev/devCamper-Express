const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require("./config/db");

// Load env vars

dotenv.config({ path: "./config/config.env" });
const { PORT, NODE_ENV } = process.env;

// Connect to the database
connectDB();

// Route files
const bootcamps = require("./routes/bootcamps");

// Initialize express server with port and node enviroment
const app = express();

// Dev loggin middleware
if (NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Mount routers -> middleware
app.use("/api/v1/bootcamps", bootcamps);

const server = app.listen(
  PORT,
  console.log(`Server running in ${NODE_ENV} mode on port ${PORT}`)
);

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});
