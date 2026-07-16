require("dotenv").config();
const express  = require("express");
const cors     = require("cors");
const mongoose = require("mongoose");
const path     = require("path");

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/auth",      require("./routes/auth"));
app.use("/api/profile",   require("./routes/profile"));
app.use("/api/wishlist",  require("./routes/wishlist"));
app.use("/api/testdrive", require("./routes/testdrive"));
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/payment", require("./routes/razorpayRoute"));

app.get("/", (req, res) => res.json({ status: "BMW Backend running 🚗" }));

mongoose
  .connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 10000, family: 4 })
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(process.env.PORT || 5000, () =>
      console.log(`🚀 Server running on port ${process.env.PORT || 5000}`)
    );
  })
  .catch((err) => console.error("❌ MongoDB error:", err.message));