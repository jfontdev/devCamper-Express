const express = require("express");

const {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
} = require("../controllers/bootcamps");

const router = express.Router();

// Get all bootcamps
router.route("/").get(getBootcamps);

// Get one bootcamp by id
router.route("/:id").get(getBootcamp);

// Create one bootcamp
router.route("/").post(createBootcamp);

// Update a bootcamp by id
router.route("/:id").put(updateBootcamp);

// Delete a bootcamp by id
router.route("/:id").delete(deleteBootcamp);

module.exports = router;
