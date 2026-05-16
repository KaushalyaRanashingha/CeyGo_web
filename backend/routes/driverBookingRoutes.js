const express = require("express");
const router = express.Router();
const { createDriverBooking, getDriverBookings, deleteDriverBooking } = require("../controllers/driverBookingController");
router.post("/", createDriverBooking);
router.get("/", getDriverBookings);
router.delete("/:id", deleteDriverBooking);
module.exports = router;