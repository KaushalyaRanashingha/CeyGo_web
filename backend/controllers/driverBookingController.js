const Booking = require("../models/DriverBooking");

// CREATE
const createDriverBooking = async (req, res) => {
  try {
    const booking = await Booking.create(req.body);
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL
const getDriverBookings = async (req, res) => {
  try {
    const data = await Booking.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE
const deleteDriverBooking = async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createDriverBooking,
  getDriverBookings,
  deleteDriverBooking,
};