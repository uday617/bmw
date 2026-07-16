const express = require("express");
const router  = express.Router();
const Order   = require("../models/Order");
const auth    = require("../middleware/auth");

// ── POST /api/orders — naya order save karo
router.post("/", auth, async (req, res) => {
  try {
    const { vehicle, personalData, financeType, emiConfig } = req.body;

    const order = new Order({
      userId:      req.user.id,
      vehicle,
      personalData,
      financeType,
      emiConfig:   financeType === "bmw" ? emiConfig : null,
      status:      "pending",
      orderedAt:   new Date(),
    });

    await order.save();
    res.status(201).json({ success: true, order });

  } catch (err) {
    console.error("Order error:", err);
    res.status(500).json({ success: false, message: "Order save nahi hua" });
  }
});

// ── GET /api/orders — user ke saare orders
router.get("/", auth, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id }).sort({ orderedAt: -1 });
    res.json({ success: true, orders });
  } catch (err) {
    res.status(500).json({ success: false, message: "Orders fetch nahi hue" });
  }
});

module.exports = router;