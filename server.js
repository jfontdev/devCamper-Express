const express = require("express");
const dotenv = require("dotenv");

// Load env vars

dotenv.config({ path: "./config/config.env" });
const { PORT, NODE_ENV } = process.env;

// Initialize express server with port and node enviroment
const app = express();

app.listen(
  PORT,
  console.log(`Server running in ${NODE_ENV} mode on port ${PORT}`)
);
