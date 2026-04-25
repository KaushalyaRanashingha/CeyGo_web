const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Login routes
router.get("/login", authController.showLogin);
router.post("/login", authController.login);

// Register routes
router.get("/register", authController.showRegister);

// Use multer middleware for file uploads
router.post(
  "/register",
  authController.uploadFields, // <- multer middleware to handle files
  authController.register
);

module.exports = router;