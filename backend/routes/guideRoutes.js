const express = require("express");
const router = express.Router();
const { createGuide, getGuides, deleteGuide } = require("../controllers/guideController");
router.post("/", createGuide);
router.get("/", getGuides);
router.delete("/:id", deleteGuide);
module.exports = router;