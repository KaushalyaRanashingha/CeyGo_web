const express = require("express");
const router = express.Router();
const { createRestaurantBooking, getRestaurantBookings, deleteRestaurantBooking } = require("../controllers/restaurantBookingController");
router.post("/", createRestaurantBooking);
router.get("/", getRestaurantBookings);
router.delete("/:id", deleteRestaurantBooking);
module.exports = router;