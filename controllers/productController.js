const Product = require("../models/Product")
const { handleError } = require("../utils/error")

const getProducts = async (req, res, next) => {
  const categoryQuery = req.query.category
    ? { $in: [req.query.category] }
    : { $ne: null }
  const sizeQuery = req.query.size ? { $in: [req.query.size] } : { $ne: null }
  const colorQuery = req.query.color
    ? { $in: [req.query.color] }
    : { $ne: null }

  try {
    const products = await Product.find({
      category: categoryQuery,
      size: sizeQuery,
      color: colorQuery,
    })
    res.status(200).json(products)
  } catch (e) {
    console.log(e.message)
    next(handleError(500, "Operation failed."))
  }
}

const getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id)
    if (product) {
      res.status(200).json(product)
    } else {
      next(handleError(500, "Item not found."))
    }
  } catch (e) {
    next(handleError(500, "Operation failed."))
  }
}

const createProduct = async (req, res, next) => {
  try {
    const product = new Product(req.body)
    await product.save()
    res.status(201).json(product)
  } catch (e) {
    console.log(e.message)
    next(handleError(500, "Error creating product."))
  }
}

const updateProduct = async (req, res, next) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    )
    res.status(200).json(updatedProduct)
  } catch (e) {
    console.log(e.message)
    next(handleError(500, "Update failed."))
  }
}

const deleteProduct = async (req, res, next) => {
  try {
    await Product.findByIdAndDelete(req.params.id)
    res.status(204).json("Delete success.")
  } catch (e) {
    console.log(e.message)
    next(handleError(500, "Delete failed."))
  }
}

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getProducts,
  getProduct,
}
