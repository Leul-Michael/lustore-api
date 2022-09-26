const { Router } = require("express")
const {
  createProduct,
  updateProduct,
  deleteProduct,
  getProducts,
  getProduct,
} = require("../controllers/productController")
const { authorizeAdmin } = require("../middleware/verifyMiddleware")
const router = Router()

router.route("/").get(getProducts).post(authorizeAdmin, createProduct)

router.get("/find/:id", getProduct)

router
  .route("/:id")
  .put(authorizeAdmin, updateProduct)
  .delete(authorizeAdmin, deleteProduct)

module.exports = router
