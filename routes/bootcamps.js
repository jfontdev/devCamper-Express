const express = require("express");

const {
    getBootcamps,
    getBootcamp,
    createBootcamp,
    updateBootcamp,
    deleteBootcamp,
    getBootcampsInRadius, bootcampPhotoUpload
} = require("../controllers/bootcamps");

const Bootcamp = require("../models/Bootcamp")
const advancedResults = require("../middleware/advancedResults")

// Include other resource routers
const courseRouter = require("./courses")
const reviewRouter = require("./reviews")

const router = express.Router();

const { protect , authorize } = require("../middleware/auth")

// Re-route into other resource routers
router.use("/:bootcampId/courses", courseRouter)
router.use("/:bootcampId/reviews", reviewRouter)

// Get all bootcamps
router.route("/").get(advancedResults(Bootcamp, "courses"), getBootcamps);

// Get one bootcamp by id
router.route("/:id").get(getBootcamp);

// Create one bootcamp
router.route("/").post(protect,authorize("publisher","admin"), createBootcamp);

// Update a bootcamp by id
router.route("/:id").put(protect, authorize("publisher", "admin"), updateBootcamp);

// Delete a bootcamp by id
router.route("/:id").delete(protect,authorize("publisher","admin"), deleteBootcamp);

// Get bootcamps in radius
router.route("/radius/:zipcode/:distance").get(getBootcampsInRadius)

// Upload photo to bootcamp
router.route("/:id/photo").put(protect, authorize("publisher","admin"), bootcampPhotoUpload)

module.exports = router;
