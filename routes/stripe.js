const router = require("express").Router()
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)
const { handleError } = require("../utils/error")

router.post("/create-checkout-session", async (req, res, next) => {
  //   const storeItems = new Map([
  //     [1, { priceInCents: 30000, name: "Learn css today" }],
  //     [2, { priceInCents: 50000, name: "Learn how to run!" }],
  //   ])
  //   try {
  //     const session = await stripe.checkout.sessions.create({
  //       payment_method_types: ["card"],
  //       line_items: [
  //         {
  //           price_data: {
  //             currency: "usd",
  //             product_data: {
  //               name: "T-shirt",
  //             },
  //             unit_amount: 2000,
  //           },
  //           quantity: 1,
  //         },
  //       ],
  //       mode: "payment",
  //       success_url: `${process.env.CLIENT_DOMAIN}?success=true`,
  //       cancel_url: `${process.env.CLIENT_DOMAIN}?canceled=true`,
  //     })
  //     res.json({ url: session.url })
  //   } catch (e) {
  //     console.log(e.message)
  //     next(handleError(500, "Operation failed."))
  //   }
})

module.exports = router
