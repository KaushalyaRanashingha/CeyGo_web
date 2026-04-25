const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const multer = require("multer");

// Connect Database
require("./config/db");

const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const hotelRoutes = require("./routes/hotelRoutes");
const vehicleRoutes = require("./routes/vehicleRoutes");
const restaurantRoutes = require("./routes/restaurantRoutes");
const agentRoutes = require("./routes/agentRoutes");

const app = express();

// View Engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.json()); // Parse JSON
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded forms
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/upload", express.static(path.join(__dirname, "upload"))); // Serve uploaded files

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "upload"); // Save files to ./upload folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// Pass multer middleware to routes that handle file uploads
app.use((req, res, next) => {
  req.upload = upload;
  next();
});

// Default redirect to login
app.get("/", (req, res) => {
  res.redirect("/login");
});

// Routes
app.use("/", authRoutes);      // login/register
app.use("/admin", adminRoutes);
app.use("/hotel", hotelRoutes);
app.use("/vehicle", vehicleRoutes);
app.use("/restaurant", restaurantRoutes);
app.use("/agent", agentRoutes);

// Start Server
app.listen(5004, () => {
  console.log("Server running on http://localhost:5004");
});