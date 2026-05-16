const express = require("express");
const router = express.Router();
const { createEvent, getEvents, deleteEvent, getSingleEvent } = require("../controllers/eventController");
router.post("/", createEvent);
router.get("/", getEvents);
router.delete("/:id", deleteEvent);
router.get("/:id", getSingleEvent);
module.exports = router;