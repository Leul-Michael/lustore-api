const { Router } = require("express")
const {
  getCart,
  getCarts,
  deleteCart,
  updateCart,
  createCart,
} = require("../controllers/cartController")
const {
  verifyToken,
  authorizeAdmin,
} = require("../middleware/verifyMiddleware")
const router = Router()

router.route("/").get(authorizeAdmin, getCarts).post(verifyToken, createCart)

router.get("/find", verifyToken, getCart)

router
  .route("/:id")
  .put(verifyToken, updateCart)
  .delete(verifyToken, deleteCart)

module.exports = router
