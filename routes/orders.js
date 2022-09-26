const { Router } = require("express")
const {
  getOrders,
  getUserOrders,
  createOrder,
  updateOrder,
  deleteOrder,
  getIncomeStats,
} = require("../controllers/orderController")
const {
  verifyToken,
  authorizeAdmin,
} = require("../middleware/verifyMiddleware")
const router = Router()

router.route("/").get(authorizeAdmin, getOrders).post(verifyToken, createOrder)

router.get("/find", verifyToken, getUserOrders)
router.get("/income", authorizeAdmin, getIncomeStats)

router
  .route("/:id")
  .put(verifyToken, updateOrder)
  .delete(verifyToken, deleteOrder)

module.exports = router
