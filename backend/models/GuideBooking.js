const mongoose = require("mongoose");

const guideBookingSchema = new mongoose.Schema(
  {
    guideId: String,
    guideName: String,
    userName: String,
    email: String,
    phone: String,
    date: String,
    days: Number,
    location: String,
  },
  { timestamps: true },
);

module.exports = mongoose.models.GuideBooking || mongoose.model("GuideBooking", guideBookingSchema);