const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    hotelId: { type: mongoose.Schema.Types.ObjectId, ref: "Hotel", required: true },
    name: String,
    email: String,
    date: String,
    guests: Number,
    request: String,
  },
  { timestamps: true },
);

module.exports = mongoose.models.Booking || mongoose.model("Booking", bookingSchema);