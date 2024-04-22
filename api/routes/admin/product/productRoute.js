const { createProduct, getProduct, deleteProduct, editProduct } = require("../../../controller/admin/product/productController")
const isAuthenticated = require("../../../middleware/isAuthenticated")
const restrictTo = require("../../../middleware/restrictTo")
const {multer,storage  } =  require("../../../middleware/multerConfig")
const catchAsync = require("../../../services/catchAsync")
const { getProducts } = require("../../../controller/global/globalController")
const upload = multer({storage : storage})

const router = require("express").Router()

router.route('/product').post(isAuthenticated, restrictTo("Admin"),upload.single('productImage'), catchAsync(createProduct)).get(catchAsync(getProducts))
router.route('/product/:id').get(catchAsync(getProduct)).patch(isAuthenticated,restrictTo("Admin"),upload.single('productImage'),catchAsync(editProduct)).delete( isAuthenticated,restrictTo("Admin"),catchAsync(deleteProduct))

module.exports = router