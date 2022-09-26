const jwt = require("jsonwebtoken")
const User = require("../models/User")
const { handleError } = require("../utils/error")

const verifyToken = async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      const token = req.headers.authorization.split(" ")[1]
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
      req.user = await User.findById(decoded.id).select("-password")

      next()
    } catch {
      next(handleError(401, "Not authorized!"))
    }
  } else {
    next(handleError(401, "Not authorized, no token!"))
  }
}

const authorizeUserOrAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user?.id === req.params?.id || req.user?.isAdmin) {
      next()
    } else {
      next(handleError(403, "Access Forbidden!"))
    }
  })
}

const authorizeAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user?.isAdmin) {
      next()
    } else {
      next(handleError(403, "Access Forbidden! You're not admin"))
    }
  })
}

module.exports = { verifyToken, authorizeUserOrAdmin, authorizeAdmin }
