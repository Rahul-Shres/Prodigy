const { getMyBookmarks, deleteProductFromBookmark, addToBookmark } = require("../../../controller/user/bookmark/bookmarkController");
const isAuthenticated = require("../../../middleware/isAuthenticated");
const catchAsync = require("../../../services/catchAsync");



const router = require("express").Router();


router.route("/").get(isAuthenticated, catchAsync(getMyBookmarks))
router.route("/:productId").post(isAuthenticated, catchAsync(addToBookmark)).delete(isAuthenticated,catchAsync(deleteProductFromBookmark))

module.exports = router