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

// Get all bootcamps
app.get("/api/v1/bootcamps", (req, res) => {
  res.status(200).json({ success: true, msg: "Show all bootcamps" });
});

// Get one bootcamp by id
app.get("/api/v1/bootcamps/:id", (req, res) => {
  res
    .status(200)
    .json({ success: true, msg: `Show bootcamp with id: ${req.params.id}` });
});

// Create one bootcamp
app.post("/api/v1/bootcamps", (req, res) => {
  res.status(201).json({ success: true, msg: "Create new bootcamp" });
});

// Update a bootcamp by id
app.put("/api/v1/bootcamps/:id", (req, res) => {
  res
    .status(200)
    .json({ success: true, msg: `Updated bootcamp with id: ${req.params.id}` });
});

app.delete("/api/v1/bootcamps/:id", (req, res) => {
  res
    .status(204)
    .json({ success: true, msg: `Deleted bootcamp with id: ${req.params.id}` });
});
