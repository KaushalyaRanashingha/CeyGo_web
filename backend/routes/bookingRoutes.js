const express = require("express");
const router = express.Router();
const { createBooking, getBookings, deleteBooking } = require("../controllers/bookingController");
const protect = require("../middleware/authMiddleware");
router.post("/", protect, createBooking);
router.get("/", protect, getBookings);
router.delete("/:id", protect, deleteBooking);
module.exports = router;