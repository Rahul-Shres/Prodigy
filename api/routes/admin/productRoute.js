const { createProduct } = require("../../controller/admin/product/productController")
const isAuthenticated = require("../../middleware/isAuthenticated")
const restrictTo = require("../../middleware/restrictTo")
const {multer,storage  } =  require("../../middleware/multerConfig")
const catchAsync = require("../../services/catchAsync")
const upload = multer({storage : storage})

const router = require("express").Router()

router.route('/product').post(isAuthenticated, restrictTo("Admin"),upload.single('productImage'), catchAsync(createProduct))

module.exports = router