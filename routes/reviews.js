const express = require("express");

const {
    getReviews, getReview
} = require("../controllers/reviews");

const Review = require("../models/Review")
const advancedResults = require("../middleware/advancedResults")

const router = express.Router({mergeParams: true});

const {protect, authorize} = require("../middleware/auth")

// Get all reviews
router.route("/").get(
    advancedResults(Review, {
        path: "bootcamp",
        select: "name description"
    }), getReviews
);

// Get a single review

router.route("/:id").get(
    getReview
)

module.exports = router;