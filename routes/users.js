const { Router } = require("express")
const {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  getUserStatus,
} = require("../controllers/usersController")
const {
  authorizeUserOrAdmin,
  authorizeAdmin,
} = require("../middleware/verifyMiddleware")
const router = Router()

router
  .route("/:id")
  .put(authorizeUserOrAdmin, updateUser)
  .delete(authorizeUserOrAdmin, deleteUser)

router.route("/").get(authorizeAdmin, getAllUsers)
router.route("/stats").get(authorizeAdmin, getUserStatus)
router.route("/find/:id").get(authorizeAdmin, getUser)

module.exports = router
