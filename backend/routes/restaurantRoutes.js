const express = require("express");
const router = express.Router();
const { createRestaurant, getRestaurants, getRestaurantById, deleteRestaurant } = require("../controllers/restaurantController");
router.post("/", createRestaurant);
router.get("/", getRestaurants);
router.get("/:id", getRestaurantById);
router.delete("/:id", deleteRestaurant);
module.exports = router;