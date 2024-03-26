const express = require("express");

const {
    getReviews, getReview, addReview, updateReview, deleteReview
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

// Add review
router.route("/").post(protect, authorize("user", "admin"), addReview)

// Update review
router.route("/:id").put(protect, authorize("user", "admin"), updateReview)

// Delete review
router.route("/:id").delete(protect, authorize("user", "admin"), deleteReview)

module.exports = router;