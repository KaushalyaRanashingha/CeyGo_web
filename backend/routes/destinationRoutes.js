const express = require("express");
const router = express.Router();

const {
  createDestination,
  getDestinations,
  getDestination,
  deleteDestination,
  updateDestination,
  getWeather,
  bulkCreateDestinations,
} = require("../controllers/destinationController");

// ─── Public Routes ────────────────────────────────────────────────────────────
// GET  /api/destinations                → get all (supports ?popular=true&district=Galle&category=Beaches&search=fort&sort=rating)
// GET  /api/destinations/:id            → get one
// GET  /api/destinations/weather?lat=&lng=  → live weather proxy (keeps API key server-side)
router.get("/weather", getWeather);
router.get("/", getDestinations);
router.get("/:id", getDestination);

// ─── Admin Routes (add auth middleware before deploying) ──────────────────────
// POST   /api/destinations              → create one
// POST   /api/destinations/bulk         → create many
// PUT    /api/destinations/:id          → update
// DELETE /api/destinations/:id          → delete

// Example with auth: router.post("/", requireAdmin, createDestination);
// For now, open for development:
router.post("/bulk", bulkCreateDestinations);
router.post("/", createDestination);
router.put("/:id", updateDestination);
router.delete("/:id", deleteDestination);

module.exports = router;