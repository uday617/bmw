const express  = require("express");
const router   = express.Router();
const protect  = require("../middleware/auth");
const Wishlist = require("../models/Wishlist");

// GET /api/wishlist — sabhi wishlist items
router.get("/", protect, async (req, res) => {
  try {
    let wishlist = await Wishlist.findOne({ user: req.user._id });
    if (!wishlist) return res.json({ vehicles: [] });
    res.json({ vehicles: wishlist.vehicles });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// POST /api/wishlist — add vehicle
router.post("/", protect, async (req, res) => {
  const vehicle = req.body;
  try {
    let wishlist = await Wishlist.findOne({ user: req.user._id });
    if (!wishlist) {
      wishlist = await Wishlist.create({ user: req.user._id, vehicles: [vehicle] });
    } else {
      const exists = wishlist.vehicles.find(v => v.vehicleId === vehicle.vehicleId);
      if (exists) return res.json({ vehicles: wishlist.vehicles }); // already added
      wishlist.vehicles.push(vehicle);
      await wishlist.save();
    }
    res.json({ vehicles: wishlist.vehicles });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE /api/wishlist/:vehicleId — remove vehicle
router.delete("/:vehicleId", protect, async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user._id });
    if (!wishlist) return res.json({ vehicles: [] });
    wishlist.vehicles = wishlist.vehicles.filter(v => v.vehicleId !== Number(req.params.vehicleId));
    await wishlist.save();
    res.json({ vehicles: wishlist.vehicles });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;