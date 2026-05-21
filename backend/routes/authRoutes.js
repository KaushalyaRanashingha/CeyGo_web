const express = require("express");

const router = express.Router();

const {
  registerUser,
  loginUser,
} = require("../controllers/authController");

// TEST
router.get("/", (req, res) => {
  res.send("Auth Route Working");
});

// REGISTER
router.post("/register", registerUser);

// LOGIN
router.post("/login", loginUser);

module.exports = router;