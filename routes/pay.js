const paypal = require("paypal-rest-sdk");
const express = require("express");
const stripe = require("stripe")("sk_test_lwusRFd7TbPAPXn2Acskc1zH00GVgDdOmQ");
const router = express.Router();
const Pay = require("../model/pay");

// app.set("view engine", "ejs");

router.post("/", (req, res) => {
  const pay = Pay({
    fullName: req.body.fullName,
    userId: req.body.userId,
    driver: req.body.driver,
    cost: req.body.cost,
    distance: req.body.distance
  });
  pay
    .save()
    .then(result => {})
    .catch(err => {
      res.status(401).json({
        message: "error occured"
      });
    });
  return stripe.checkout.sessions
    .create({
      payment_method_types: ["card"],
      line_items: [
        {
          name: "Travel",
          description: "Booking for Travel",
          amount: req.body.cost * 100,
          currency: "INR",
          quantity: 1
        }
      ],
      success_url: "http://localhost:3000/booking/success",
      cancel_url: "http://localhost:3000/booking/cancle"
    })
    .then(session => {
      console.log(session);
      res.status(200).json({
        name: req.body.fullName,
        cost: req.body.cost,
        userId: req.body.userId,
        sessionId: session.id
      });
    });
});

module.exports = router;
