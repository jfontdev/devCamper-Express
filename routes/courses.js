const express = require("express");

const {
    getCourses,
    getCourse,
    addCourse
} = require("../controllers/courses");

const router = express.Router({mergeParams: true});

// Get all courses
router.route("/").get(getCourses)

// Get one course
router.route("/:id").get(getCourse)

// Create one course
router.route("/").post(addCourse)

module.exports = router;