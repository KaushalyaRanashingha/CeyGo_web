const express = require("express");
const router = express.Router();
const { createDriver, getDrivers, deleteDriver } = require("../controllers/driverController");
router.post("/", createDriver);
router.get("/", getDrivers);
router.delete("/:id", deleteDriver);
module.exports = router;