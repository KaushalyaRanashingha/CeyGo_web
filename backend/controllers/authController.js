const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");
const path = require("path");
const multer = require("multer");
const fs = require("fs");

// Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, "../public/uploads");
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Middleware to handle file uploads
exports.uploadFields = upload.fields([
  { name: "profileImage", maxCount: 1 },
  { name: "businessLicenseImage", maxCount: 1 },
]);

// Show login page
exports.showLogin = (req, res) => {
  res.render("admin/login", {
    title: "Login",
    email: "",
    roleOptions: [
      { value: "admin", label: "Admin" },
      { value: "partner", label: "Partner" },
    ],
    errors: [],
  });
};

// Handle login POST
exports.login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.render("admin/login", {
        title: "Login",
        email: email || "",
        roleOptions: [
          { value: "admin", label: "Admin" },
          { value: "partner", label: "Partner" },
        ],
        errors: ["All fields are required"],
      });
    }

    const user = await Admin.findOne({ email, role });
    if (!user) {
      return res.render("admin/login", {
        title: "Login",
        email,
        roleOptions: [
          { value: "admin", label: "Admin" },
          { value: "partner", label: "Partner" },
        ],
        errors: ["User not found"],
      });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.render("admin/login", {
        title: "Login",
        email,
        roleOptions: [
          { value: "admin", label: "Admin" },
          { value: "partner", label: "Partner" },
        ],
        errors: ["Incorrect password"],
      });
    }

    return res.render("admin/dashboard", {
      title: "Dashboard",
      admin: {
        name: user.name,
        role: user.role,
        profileImage: user.profileImage || "/images/default-profile.png",
      },
      stats: [],
      recentBookings: [],
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.render("admin/login", {
      title: "Login",
      email: req.body.email || "",
      roleOptions: [
        { value: "admin", label: "Admin" },
        { value: "partner", label: "Partner" },
      ],
      errors: ["Something went wrong. Please try again."],
    });
  }
};

// Show register page
exports.showRegister = (req, res) => {
  res.render("admin/register", {
    title: "Partner Registration",
    email: "",
    name: "",
    phone: "",
    IdNumber: "",
    businessname: "",
    address: "",
    roles: [
      { value: "hotel", label: "Hotel" },
      { value: "vehicle", label: "Vehicle" },
      { value: "restaurant", label: "Restaurant" },
    ],
    selectedRole: "",
    errors: [],
    action: "/register",
  });
};

// Handle registration POST
exports.register = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      IdNumber,
      role,
      businessname,
      address,
      password,
      confirmPassword,
    } = req.body;

    const profileImage =
      req.files?.profileImage?.[0]?.filename || "/images/default-profile.png";
    const businessLicenseImage =
      req.files?.businessLicenseImage?.[0]?.filename || "";

    const errors = [];

    if (!name || !email || !phone || !role || !businessname || !address || !password || !confirmPassword) {
      errors.push("All fields are required");
    }
    if (password !== confirmPassword) errors.push("Passwords do not match");

    const existingUser = await Admin.findOne({ email });
    if (existingUser) errors.push("Email already registered");

    if (errors.length > 0) {
      return res.render("admin/register", {
        title: "Partner Registration",
        name,
        email,
        phone,
        IdNumber,
        businessname,
        address,
        roles: [
          { value: "hotel", label: "Hotel" },
          { value: "vehicle", label: "Vehicle" },
          { value: "restaurant", label: "Restaurant" },
        ],
        selectedRole: role,
        errors,
        action: "/register",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({
      name,
      email,
      phone,
      IdNumber,
      role,
      businessname,
      address,
      password: hashedPassword,
      profileImage: `/uploads/${profileImage}`,
      businessLicenseImage: businessLicenseImage ? `/uploads/${businessLicenseImage}` : "",
    });

    await newAdmin.save();
    res.redirect("/login");
  } catch (err) {
    console.error(err);
    res.send("Something went wrong");
  }
};