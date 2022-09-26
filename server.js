require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const path = require("path")
const cors = require("cors")
const { errorMiddleware } = require("./middleware/errorMiddleware")

const app = express()

const PORT = process.env.PORT || 5000

// Connect to DB
mongoose.connect(process.env.MONGO_URL, () => console.log("Connected to DB..."))

// JSON
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: false }))

// Routes
app.use("/api/users", require("./routes/users"))
app.use("/api/auth", require("./routes/auth"))
app.use("/api/products", require("./routes/products"))
app.use("/api/orders", require("./routes/orders"))
app.use("/api/carts", require("./routes/carts"))
app.use("/api/payment", require("./routes/stripe"))

// Frontend
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")))

  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "../", "client", "build", "index.html")
    )
  )
} else {
  app.get("/", (req, res) => res.send("Please set to production"))
}

app.use(errorMiddleware)

app.listen(PORT, () => console.log(`Server started on port ${PORT}...`))
