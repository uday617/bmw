const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name:     { type: String, required: true },
  email:    { type: String, required: true, unique: true, lowercase: true },
  password: { type: String },
  googleId: { type: String },
  avatar:   { type: String, default: "" },
  birthday: { type: String, default: "" },
  phones: {
    mobilePrivate:   { type: String, default: "" },
    mobileBusiness:  { type: String, default: "" },
    landlinePrivate: { type: String, default: "" },
    landlineBusiness:{ type: String, default: "" },
  },
  addresses: {
    private:  { type: String, default: "" },
    business: { type: String, default: "" },
  },
  createdAt: { type: Date, default: Date.now },
});

userSchema.pre("save", async function () {
  if (!this.isModified("password") || !this.password) return;
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.matchPassword = async function (entered) {
  return await bcrypt.compare(entered, this.password);
};

module.exports = mongoose.model("User", userSchema);