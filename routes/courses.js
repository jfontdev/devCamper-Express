const express = require("express");

const {
    getCourses,
    getCourse,
    addCourse,
    updateCourse, deleteCourse
} = require("../controllers/courses");

const Course = require("../models/Course")
const advancedResults = require("../middleware/advancedResults")

const router = express.Router({mergeParams: true});

// Get all courses
router.route("/").get(advancedResults(Course,
    {
        path: "bootcamp",
        select: "name description"
    }), getCourses)

// Get one course
router.route("/:id").get(getCourse)

// Create one course
router.route("/").post(addCourse)

// Update a course
router.route("/:id").put(updateCourse)

// Delete a course
router.route("/:id").delete(deleteCourse)

module.exports = router;