const mongoose = require("mongoose");

const driverBookingSchema = new mongoose.Schema(
  {
    driverId: String,
    driverName: String,
    userName: String,
    email: String,
    phone: String,
    pickupLocation: String,
    dropLocation: String,
    date: String,
    time: String,
    days: Number,
  },
  { timestamps: true },
);

module.exports = mongoose.models.DriverBooking || mongoose.model("DriverBooking", driverBookingSchema);