const Order = require("../models/Order")
const { handleError } = require("../utils/error")

const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find().populate("user")
    if (orders) {
      res.status(200).json(orders)
    } else {
      next(handleError(500, "Orders not found."))
    }
  } catch (e) {
    next(handleError(500, "Operation failed."))
  }
}

const getUserOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user.id })
    if (orders) {
      res.status(200).json(orders)
    } else {
      next(handleError(500, "Orders not found."))
    }
  } catch (e) {
    next(handleError(500, "Operation failed."))
  }
}

const createOrder = async (req, res, next) => {
  try {
    const order = new Order(req.body, { user: req.user.id })
    await order.save()
    res.status(201).json(order)
  } catch (e) {
    console.log(e.message)
    next(handleError(500, "Error creating order."))
  }
}

const updateOrder = async (req, res, next) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    )
    res.status(200).json(updatedOrder)
  } catch (e) {
    console.log(e.message)
    next(handleError(500, "Update failed."))
  }
}

const deleteOrder = async (req, res, next) => {
  try {
    await Order.findByIdAndDelete(req.params.id)
    res.status(204).json("Delete success.")
  } catch (e) {
    console.log(e.message)
    next(handleError(500, "Delete failed."))
  }
}

const getIncomeStats = async (req, res, next) => {
  const todate = new Date() // jan
  const lastMonth = new Date(todate.setMonth(todate.getMonth() - 1)) // dec
  const prevMonth = new Date(new Date.setMonth(lastMonth.getMonth() - 1)) // nov

  try {
    const income = await Order.aggregate([
      { $match: { createdAt: { $gte: prevMonth } } },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: { _id: "$month", total: { $sum: "$sales" } },
      },
    ])
    res.status(200).json(income)
  } catch (e) {
    console.log(e.message)
    next(handleError(500, "Operation failed."))
  }
}

module.exports = {
  createOrder,
  deleteOrder,
  updateOrder,
  getOrders,
  getUserOrders,
  getIncomeStats,
}
