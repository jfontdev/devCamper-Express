const express = require("express");

const {
    getBootcamps,
    getBootcamp,
    createBootcamp,
    updateBootcamp,
    deleteBootcamp,
    getBootcampsInRadius
} = require("../controllers/bootcamps");

// Include other resource routers
const courseRouter = require("./courses")

const router = express.Router();

// Re-route into other resource routers
router.use("/:bootcampId/courses", courseRouter)

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

// Get bootcamps in radius
router.route("/radius/:zipcode/:distance").get(getBootcampsInRadius)

module.exports = router;
