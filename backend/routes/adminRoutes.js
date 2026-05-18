const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

// ─── Admin Dashboard ──────────────────────────────────────────────────────────
router.get("/dashboard", adminController.dashboard);

// ─── Admin Destinations Management Page ──────────────────────────────────────
// GET /admin/destinations  → renders the EJS table with all DB destinations
router.get("/destinations", adminController.destinationsPage);

// NOTE: Add/Edit/Delete for destinations go through the REST API at /api/destinations
// The admin EJS page calls those endpoints via fetch() (AJAX) and reloads.
// If you prefer server-side form submissions instead, add routes here:
//
// router.post("/destinations", adminController.createDestination);
// router.post("/destinations/:id/edit", adminController.updateDestination);
// router.post("/destinations/:id/delete", adminController.deleteDestination);

module.exports = router;