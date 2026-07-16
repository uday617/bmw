const express = require("express");
const router  = express.Router();
const multer  = require("multer");
const path    = require("path");
const fs      = require("fs");
const protect = require("../middleware/auth");
const User    = require("../models/User");

// Multer setup — uploads folder
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "uploads/avatars";
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, `${req.user._id}${path.extname(file.originalname)}`);
  },
});
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|webp/;
    if (allowed.test(file.mimetype)) cb(null, true);
    else cb(new Error("Only images allowed"));
  },
});

// ── GET /api/profile ─────────────────────────────────────────
router.get("/", protect, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.json(user);
});

// ── PUT /api/profile ─────────────────────────────────────────
router.put("/", protect, async (req, res) => {
  const { name, birthday, phones, addresses } = req.body;

  try {
    const user = await User.findById(req.user._id);
    if (name)      user.name     = name;
    if (birthday)  user.birthday = birthday;
    if (phones)    user.phones   = { ...user.phones.toObject(), ...phones };
    if (addresses) user.addresses = { ...user.addresses.toObject(), ...addresses };

    await user.save();

    res.json({
      id: user._id, name: user.name, email: user.email,
      avatar: user.avatar, birthday: user.birthday,
      phones: user.phones, addresses: user.addresses,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// ── POST /api/profile/avatar ─────────────────────────────────
router.post("/avatar", protect, upload.single("avatar"), async (req, res) => {
  try {
    const avatarUrl = `${req.protocol}://${req.get("host")}/uploads/avatars/${req.file.filename}`;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { avatar: avatarUrl },
      { new: true }
    );
    res.json({ avatar: user.avatar });
  } catch (err) {
    res.status(500).json({ message: "Upload failed", error: err.message });
  }
});

module.exports = router;