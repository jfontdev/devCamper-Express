const express = require("express");
const dotenv = require("dotenv");

// Route files

const bootcamps = require("./routes/bootcamps");

// Load env vars

dotenv.config({ path: "./config/config.env" });
const { PORT, NODE_ENV } = process.env;

// Initialize express server with port and node enviroment
const app = express();
// Mount routers -> middleware
app.use("/api/v1/bootcamps", bootcamps);

app.listen(
  PORT,
  console.log(`Server running in ${NODE_ENV} mode on port ${PORT}`)
);
