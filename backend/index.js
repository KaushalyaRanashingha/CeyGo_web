// index.js

const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
require("dotenv").config();

const app = express();

/* ─────────────────────────────────────────
   Middlewares
───────────────────────────────────────── */
app.use(cors());
app.use(express.json());

/* ─────────────────────────────────────────
   MongoDB Connection
───────────────────────────────────────── */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected successfully");
  })
  .catch((err) => {
    console.log("❌ MongoDB connection error:", err.message);
  });

/* ─────────────────────────────────────────
   User Schema + Model
───────────────────────────────────────── */
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },
  },
  {
    timestamps: true,
  }
);

/* Password Hash Before Save */
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

/* ─────────────────────────────────────────
   JWT Token Generator
───────────────────────────────────────── */
const createToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

/* ─────────────────────────────────────────
   Routes
───────────────────────────────────────── */

/* Health Check */
app.get("/", (req, res) => {
  res.send("CeyGo Backend Running ✅");
});

/* ── SIGNUP ───────────────────────── */
app.post("/api/auth/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    /* Validation */
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Please fill all fields",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
      });
    }

    /* Check Existing User */
    const existingUser = await User.findOne({
      email: email.toLowerCase(),
    });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    /* Create User */
    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password,
    });

    res.status(201).json({
      message: "Signup successful",
      token: createToken(user._id),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.log("Signup Error:", error.message);

    res.status(500).json({
      message: "Server error during signup",
    });
  }
});

/* ── LOGIN ───────────────────────── */
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    /* Validation */
    if (!email || !password) {
      return res.status(400).json({
        message: "Please provide email and password",
      });
    }

    /* Find User */
    const user = await User.findOne({
      email: email.toLowerCase().trim(),
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    /* Compare Password */
    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    res.status(200).json({
      message: "Login successful",
      token: createToken(user._id),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.log("Login Error:", error.message);

    res.status(500).json({
      message: "Server error during login",
    });
  }
});

/* ─────────────────────────────────────────
   Server Start
───────────────────────────────────────── */
const PORT = process.env.PORT || 5004;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});