const User = require("../models/User")
const bcrypt = require("bcryptjs")
const { handleError } = require("../utils/error")

const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select("-password")
    if (user) {
      res.status(200).json(user)
    } else {
      next(handleError(500, "User not found."))
    }
  } catch (e) {
    console.log(e.message)
    next(handleError(500, "Operation failed."))
  }
}

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({ isAdmin: false }).select("-password")
    if (users?.length) {
      res.status(200).json(users)
    } else {
      next(handleError(500, "No User found."))
    }
  } catch (e) {
    console.log(e.message)
    next(handleError(500, "Operation failed."))
  }
}

const getUserStatus = async (req, res, next) => {
  const todate = new Date()
  const lastYear = new Date(todate.setFullYear(todate.getFullYear() - 1))

  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear }, isAdmin: false } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: { _id: "$month", total: { $sum: 1 } },
      },
    ])
    res.status(200).json(data)
  } catch (e) {
    console.log(e.message)
    next(handleError(500, "Operation failed."))
  }
}

const updateUser = async (req, res, next) => {
  if (req.body.password) {
    const salt = await bcrypt.genSalt()
    req.body.password = await bcrypt.hash(req.body.password, salt)
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    )
    res.status(200).json(updatedUser)
  } catch (e) {
    console.log(e.message)
    next(handleError(500, "Update failed."))
  }
}

const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id)
    res.status(204).json("Delete success.")
  } catch (e) {
    console.log(e.message)
    next(handleError(500, "Delete failed."))
  }
}

module.exports = {
  updateUser,
  deleteUser,
  getUser,
  getAllUsers,
  getUserStatus,
}
