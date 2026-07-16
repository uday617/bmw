const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema({
  user:    { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  vehicles: [
    {
      vehicleId:    { type: Number, required: true },
      name:         String,
      img:          String,
      price:        String,
      emi:          String,
      fuel:         String,
      transmission: String,
      performance:  String,
      dealer:       String,
      tag:          String,
      addedAt:      { type: Date, default: Date.now },
    }
  ],
});

module.exports = mongoose.model("Wishlist", wishlistSchema);