const mongoose = require("mongoose");

const driverSchema = new mongoose.Schema(
  {
    name: String,
    location: String,
    vehicleType: String,
    phone: String,
    pricePerKm: Number,
    rating: Number,
    image: String,
    experience: String,
  },
  { timestamps: true },
);

module.exports = mongoose.models.Driver || mongoose.model("Driver", driverSchema);