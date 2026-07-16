const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  vehicle: {
    vehicleId: String,
    name:      String,
    img:       String,
    price:     String,
    vin:       String,
    dealer:    String,
    tag:       String,
  },
  personalData: {
    salutation: String,
    firstName:  String,
    lastName:   String,
    email:      String,
    phone:      String,
    street:     String,
    city:       String,
    state:      String,
    pincode:    String,
  },
  financeType: {
    type: String,
    enum: ["self", "bmw"],
    default: "self",
  },
  emiConfig: {
    product:  String,
    loanTerm: Number,
    downPct:  Number,
    mileage:  Number,
  },
  payment: {
    razorpayOrderId:   String,
    razorpayPaymentId: String,
    razorpaySignature: String,
    paidAt:            Date,
  },
  status: {
    type: String,
    enum: ["pending", "confirmed", "cancelled"],
    default: "pending",
  },
  orderedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", OrderSchema);