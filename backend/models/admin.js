const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const adminSchema = new mongoose.Schema({
  name: { type: String, default: "Admin" },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "admin" }
});

// Pre-save hook for password hashing (async, no next)
adminSchema.pre("save", async function () {
  if (!this.isModified("password")) return; // Only hash new/modified passwords
  this.password = await bcrypt.hash(this.password, 10);
});

module.exports = mongoose.model("Admin", adminSchema);