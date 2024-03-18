const express = require("express");
const router = express.Router();

// Get all bootcamps
router.get("/", (req, res) => {
  res.status(200).json({ success: true, msg: "Show all bootcamps" });
});

// Get one bootcamp by id
router.get("/:id", (req, res) => {
  res
    .status(200)
    .json({ success: true, msg: `Show bootcamp with id: ${req.params.id}` });
});

// Create one bootcamp
router.post("/", (req, res) => {
  res.status(201).json({ success: true, msg: "Create new bootcamp" });
});

// Update a bootcamp by id
router.put("/:id", (req, res) => {
  res
    .status(200)
    .json({ success: true, msg: `Updated bootcamp with id: ${req.params.id}` });
});

// Delete a bootcamp by id
router.delete("/:id", (req, res) => {
  res
    .status(204)
    .json({ success: true, msg: `Deleted bootcamp with id: ${req.params.id}` });
});

module.exports = router;
