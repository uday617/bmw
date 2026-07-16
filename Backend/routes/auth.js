const express = require("express");
const router  = express.Router();
const jwt     = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const User    = require("../models/User");
const protect = require("../middleware/auth");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ message: "All fields required" });
  if (password.length < 6)
    return res.status(400).json({ message: "Password must be at least 6 characters" });
  try {
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "Email already registered" });
    const user = await User.create({ name, email, password });
    res.status(201).json({
      token: generateToken(user._id),
      user: { id: user._id, name: user.name, email: user.email, avatar: user.avatar },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "All fields required" });
  try {
    const user = await User.findOne({ email });
    if (!user || !user.password)
      return res.status(401).json({ message: "Invalid email or password" });
    const match = await user.matchPassword(password);
    if (!match)
      return res.status(401).json({ message: "Invalid email or password" });
    res.json({
      token: generateToken(user._id),
      user: { id: user._id, name: user.name, email: user.email, avatar: user.avatar },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

router.post("/google", async (req, res) => {
  const { credential } = req.body;

  console.log("=== GOOGLE AUTH DEBUG ===");
  console.log("Credential received:", credential ? "YES" : "NO");
  console.log("Client ID set:", process.env.GOOGLE_CLIENT_ID ? "YES" : "NO");
  console.log("Client ID value:", process.env.GOOGLE_CLIENT_ID);

  try {
    const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    console.log("Token verified successfully!");
    const { name, email, picture, sub: googleId } = ticket.getPayload();

    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ name, email, googleId, avatar: picture });
    } else if (!user.googleId) {
      user.googleId = googleId;
      user.avatar = picture;
      await user.save();
    }

    res.json({
      token: generateToken(user._id),
      user: { id: user._id, name: user.name, email: user.email, avatar: user.avatar },
    });
  } catch (err) {
    console.log("GOOGLE AUTH ERROR:", err.message);
    res.status(401).json({ message: "Google auth failed", error: err.message });
  }
});

router.get("/me", protect, (req, res) => {
  const { _id, name, email, avatar } = req.user;
  res.json({ id: _id, name, email, avatar });
});

module.exports = router;