const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const app = express();

// ================= MIDDLEWARE =================
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ================= STATIC =================
app.use(express.static(path.join(__dirname, "public")));

// ================= EJS =================
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ================= MONGODB CONNECTION =================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected Successfully");
  })
  .catch((err) => {
    console.log("MongoDB Connection Error:", err);
  });

// ================= ROUTES =================
const authRoutes = require("./routes/authRoutes");

app.use("/api/auth", authRoutes);

// ================= HOME =================
app.get("/", (req, res) => {
  res.send("CeyGo API Running 🚀");
});

// ================= ADMIN LOGIN PAGE =================
app.get("/admin/login", (req, res) => {
  res.render("admin/login", {
    title: "Admin Login",
  });
});

// ================= ADMIN DASHBOARD =================
app.get("/admin/dashboard", (req, res) => {
  const admin = {
    name: "Admin",
  };

  const stats = [
    { label: "Hotels", value: 12 },
    { label: "Bookings", value: 48 },
    { label: "Users", value: 120 },
    { label: "Revenue", value: "$5400" },
  ];

  const recentBookings = [
    {
      id: "B001",
      customer: "John Doe",
      destination: "Ella",
      amount: "$120",
      status: "Confirmed",
    },
    {
      id: "B002",
      customer: "Kasun",
      destination: "Kandy",
      amount: "$90",
      status: "Pending",
    },
  ];

  res.render("admin/dashboard", {
    title: "Dashboard",
    admin,
    stats,
    recentBookings,
  });
});

// ================= TEST ROUTE =================
app.get("/api/auth/register", (req, res) => {
  res.send("Register API Working");
});

app.get("/api/auth/login", (req, res) => {
  res.send("Login API Working");
});

// ================= 404 =================
app.use((req, res) => {
  res.status(404).send("<h2>404 - Page Not Found</h2>");
});

// ================= SERVER =================
const PORT = process.env.PORT || 5004;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});