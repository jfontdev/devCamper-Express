const express = require("express");

const {
    getCourses,
    getCourse,
    addCourse,
    updateCourse, deleteCourse
} = require("../controllers/courses");

const router = express.Router({mergeParams: true});

// Get all courses
router.route("/").get(getCourses)

// Get one course
router.route("/:id").get(getCourse)

// Create one course
router.route("/").post(addCourse)

// Update a course
router.route("/:id").put(updateCourse)

// Delete a course
router.route("/:id").delete(deleteCourse)

module.exports = router;