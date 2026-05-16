const mongoose = require("mongoose");

const guideSchema = new mongoose.Schema(
  {
    name: String,
    location: String,
    languages: [String],
    experience: String,
    pricePerDay: Number,
    rating: Number,
    image: String,
    description: String,
  },
  { timestamps: true },
);

module.exports = mongoose.models.Guide || mongoose.model("Guide", guideSchema);