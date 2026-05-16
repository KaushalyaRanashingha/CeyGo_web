const express = require("express");

const router = express.Router();

const {
  savePlan,
  getPlans,
  deletePlan,
  toggleFavorite,
} = require("../controllers/planController");

const protect = require("../middleware/authMiddleware");

// SAVE PLAN
router.post("/", protect, savePlan);

// GET USER PLANS
router.get("/", protect, getPlans);

// DELETE PLAN
router.delete("/:id", protect, deletePlan);

//add to favourite
router.patch("/:id/favorite", protect, toggleFavorite);

module.exports = router;