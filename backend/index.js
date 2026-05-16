const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const hotelRoutes = require("./routes/hotelRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const planRoutes = require("./routes/planRoutes");
const destinationRoutes = require("./routes/destinationRoutes");
const eventRoutes = require("./routes/eventRoutes");
const budgetRoutes = require("./routes/budgetRoutes");
const restaurantRoutes = require("./routes/restaurantRoutes");
const restaurantBookingRoutes = require("./routes/restaurantBookingRoutes");
const guideRoutes = require("./routes/guideRoutes");
const guideBookingRoutes = require("./routes/guideBookingRoutes");
const driverRoutes = require("./routes/driverRoutes");
const driverBookingRoutes = require("./routes/driverBookingRoutes");

connectDB();

const app = express();

// =====================
// CORE MIDDLEWARE
// =====================
app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:5173"],
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // ✅ FIX: for login forms

// =====================
// EJS SETUP (ADMIN PANEL)
// =====================
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// =====================
// HOME ROUTE
// =====================
app.get("/", (req, res) => {
  res.json({ message: "CeyGo API is running 🚀" });
});

// =====================
// ADMIN ROUTES (EJS)
// =====================

// Admin Login Page
app.get("/admin/login", (req, res) => {
  res.render("admin/login");
});

// Simple login handler (replace with DB later)
app.post("/admin/login", (req, res) => {
  const { email, password } = req.body;

  if (email === "admin@ceygo.com" && password === "admin123") {
    return res.redirect("/admin/dashboard");
  }

  return res.send("Invalid credentials");
});



// =====================
// API ROUTES
// =====================
app.use("/api/auth", authRoutes);
app.use("/api/hotels", hotelRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/plans", planRoutes);
app.use("/api/destinations", destinationRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/restaurants", restaurantRoutes);
app.use("/api/budgets", budgetRoutes);
app.use("/api/restaurant-bookings", restaurantBookingRoutes);
app.use("/api/guides", guideRoutes);
app.use("/api/guide-bookings", guideBookingRoutes);
app.use("/api/drivers", driverRoutes);
app.use("/api/driver-bookings", driverBookingRoutes);

// =====================
// START SERVER
// =====================
app.listen(5004, () => {
  console.log("Server running on port 5004");
});