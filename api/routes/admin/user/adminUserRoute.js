const { getUser, deleteUser } = require("../../../controller/admin/user/userController");
const isAuthenticated = require("../../../middleware/isAuthenticated");
const restrictTo = require("../../../middleware/restrictTo");
const catchAsync = require("../../../services/catchAsync");

const router = require("express").Router();


router.route('/users').get(isAuthenticated,restrictTo("Admin"),catchAsync(getUser))
router.route("/users/:id").delete(isAuthenticated, restrictTo("admin"),deleteUser)

module.exports = router