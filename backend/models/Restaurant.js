const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    cuisine: { type: String },
    rating: { type: Number, default: 4.5 },
    priceRange: { type: String },
  },
  { timestamps: true },
);

module.exports = mongoose.models.Restaurant || mongoose.model("Restaurant", restaurantSchema);