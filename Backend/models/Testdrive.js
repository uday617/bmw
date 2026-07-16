const mongoose = require("mongoose");

const testDriveSchema = new mongoose.Schema({
  user:       { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  vehicleName:{ type: String, required: true },
  vehicleImg:  { type: String, default: "" },
  series:     { type: String },
  model:      { type: String },
  salutation: { type: String },
  firstName:  { type: String, required: true },
  lastName:   { type: String, required: true },
  email:      { type: String, required: true },
  mobile:     { type: String, required: true },
  city:       { type: String, required: true },
  financing:  { type: Boolean, default: false },
  status:     { type: String, enum: ["pending", "confirmed", "cancelled"], default: "pending" },
  appliedAt:  { type: Date, default: Date.now },
});

module.exports = mongoose.model("TestDrive", testDriveSchema);