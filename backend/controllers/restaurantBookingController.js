const Booking = require("../models/RestaurantBooking");

// CREATE BOOKING
const createRestaurantBooking = async (req, res) => {
  try {
    const booking = await Booking.create(req.body);
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL BOOKINGS
const getRestaurantBookings = async (req, res) => {
  try {
    const data = await Booking.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE
const deleteRestaurantBooking = async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createRestaurantBooking,
  getRestaurantBookings,
  deleteRestaurantBooking,
};