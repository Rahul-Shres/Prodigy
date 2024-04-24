const { getMyReviews, createReview, deleteReview } = require("../../../controller/user/review/reviewController")
const isAuthenticated = require("../../../middleware/isAuthenticated")
const restrictTo = require("../../../middleware/restrictTo")
const catchAsync = require("../../../services/catchAsync")

const router = require("express").Router()

// router.route("/reviews")
router.route("/review").get(isAuthenticated,catchAsync(getMyReviews))
router.route("/review/:id").delete(isAuthenticated,restrictTo("user"),catchAsync(deleteReview)).post(isAuthenticated,restrictTo("user"),catchAsync(createReview))


module.exports = router