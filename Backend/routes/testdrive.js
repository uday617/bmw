const express   = require("express");
const router    = express.Router();
const protect   = require("../middleware/auth");
const TestDrive = require("../models/Testdrive");
const { sendTestDriveConfirmation } = require("../utils/mailer");

// POST /api/testdrive — submit request + send email
router.post("/", protect, async (req, res) => {
  const { vehicleName,vehicleImg, series, model, salutation, firstName, lastName, email, mobile, city, financing } = req.body;

  if (!firstName || !lastName || !email || !mobile || !city || !vehicleName) {
    return res.status(400).json({ message: "Please fill all required fields." });
  }

  try {
    // Check if already applied for this vehicle
    const existing = await TestDrive.findOne({ user: req.user._id, vehicleName });
    if (existing) {
      return res.status(409).json({ message: "You have already applied for a test drive for this vehicle.", booking: existing });
    }

    // Save to DB
    const booking = await TestDrive.create({
      user: req.user._id,
      vehicleName,vehicleImg, series, model, salutation,
      firstName, lastName, email, mobile, city, financing,
    });

    // Send email — don't fail if email fails
    try {
      await sendTestDriveConfirmation({
        to: email,
        name: `${salutation ? salutation + ". " : ""}${firstName} ${lastName}`,
        vehicle: vehicleName,
        city,
        date: booking.appliedAt,
      });
    } catch (mailErr) {
      console.error("Email failed:", mailErr.message);
    }

    res.status(201).json({ message: "Test drive request submitted!", booking });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// GET /api/testdrive — get all bookings for logged in user
router.get("/", protect, async (req, res) => {
  try {
    const bookings = await TestDrive.find({ user: req.user._id }).sort({ appliedAt: -1 });
    res.json({ bookings });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/testdrive/check/:vehicleName — check if applied
router.get("/check/:vehicleName", protect, async (req, res) => {
  try {
    const existing = await TestDrive.findOne({
      user: req.user._id,
      vehicleName: decodeURIComponent(req.params.vehicleName),
    });
    res.json({ applied: !!existing, booking: existing || null });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;