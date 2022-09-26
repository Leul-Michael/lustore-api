const Cart = require("../models/Cart")
const { handleError } = require("../utils/error")

const getCarts = async (req, res, next) => {
  try {
    const carts = await Cart.find().populate("user")
    if (carts) {
      res.status(200).json(carts)
    } else {
      next(handleError(500, "Carts not found."))
    }
  } catch (e) {
    next(handleError(500, "Operation failed."))
  }
}

const getCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id })
    if (cart) {
      res.status(200).json(cart)
    } else {
      next(handleError(500, "Cart not found."))
    }
  } catch (e) {
    next(handleError(500, "Operation failed."))
  }
}

const createCart = async (req, res, next) => {
  try {
    const cart = new Cart(req.body, { user: req.user.id })
    await cart.save()
    res.status(201).json(cart)
  } catch (e) {
    console.log(e.message)
    next(handleError(500, "Error creating cart."))
  }
}

const updateCart = async (req, res, next) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    )
    res.status(200).json(updatedCart)
  } catch (e) {
    console.log(e.message)
    next(handleError(500, "Update failed."))
  }
}

const deleteCart = async (req, res, next) => {
  try {
    await Cart.findByIdAndDelete(req.params.id)
    res.status(204).json("Delete success.")
  } catch (e) {
    console.log(e.message)
    next(handleError(500, "Delete failed."))
  }
}

module.exports = {
  createCart,
  updateCart,
  deleteCart,
  getCart,
  getCarts,
}
