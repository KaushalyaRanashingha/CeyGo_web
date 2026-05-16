const express = require("express");
const router = express.Router();
const { createGuideBooking, getGuideBookings, deleteGuideBooking } = require("../controllers/guideBookingController");
router.post("/", createGuideBooking);
router.get("/", getGuideBookings);
router.delete("/:id", deleteGuideBooking);
module.exports = router;