const express  = require("express");
const router   = express.Router();
const Razorpay = require("razorpay");
const crypto   = require("crypto");
const Order    = require("../models/Order");
const auth     = require("../middleware/auth");

const razorpay = new Razorpay({
  key_id:     process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// ── POST /api/payment/create — Razorpay order banao
router.post("/create", auth, async (req, res) => {
  try {
    const { amount } = req.body; // amount in paise (1 rupee = 100 paise)

    // TEST MODE: Razorpay test mode max limit ~₹5000
    // Production mein yeh hoga: Math.round(amount * 0.025) * 100
    const isTestMode = process.env.RAZORPAY_KEY_ID?.startsWith("rzp_test_");
    const depositAmount = isTestMode ? 100 : Math.round(amount * 0.025) * 100; // 100 paise = ₹1 in test

    const razorpayOrder = await razorpay.orders.create({
      amount:   depositAmount,
      currency: "INR",
      receipt:  `order_${Date.now()}`,
    });

    res.json({ success: true, order: razorpayOrder });
  } catch (err) {
    console.error("Razorpay create error:", err);
    res.status(500).json({ success: false, message: "Payment create failed" });
  }
});

// ── POST /api/payment/verify — payment verify + order save karo
router.post("/verify", auth, async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderData, // vehicle, personalData, financeType, emiConfig
    } = req.body;

    // Signature verify karo
    const body      = razorpay_order_id + "|" + razorpay_payment_id;
    const expected  = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expected !== razorpay_signature) {
      return res.status(400).json({ success: false, message: "Payment verification failed" });
    }

    // Order DB mein save karo
    const order = new Order({
      userId:       req.user.id,
      vehicle:      orderData.vehicle,
      personalData: orderData.personalData,
      financeType:  orderData.financeType,
      emiConfig:    orderData.financeType === "bmw" ? orderData.emiConfig : null,
      status:       "confirmed", // payment ho gayi toh confirmed
      payment: {
        razorpayOrderId:   razorpay_order_id,
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,
        paidAt:            new Date(),
      },
      orderedAt: new Date(),
    });

    await order.save();
    res.json({ success: true, order });

  } catch (err) {
    console.error("Verify error:", err);
    res.status(500).json({ success: false, message: "Order save failed" });
  }
});

module.exports = router;