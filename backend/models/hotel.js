const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema(
  {
    name: String,
    location: String,
    description: String,
    image: String,
    price: String,
  },
  { timestamps: true },
);

module.exports = mongoose.models.Hotel || mongoose.model("Hotel", hotelSchema);