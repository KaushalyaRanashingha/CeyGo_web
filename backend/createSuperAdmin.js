const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Admin = require("./models/Admin");

const MONGO_URI = "mongodb://localhost:27017/ceygoAdmin";

async function createSuperAdmin() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected");

    const existingAdmin = await Admin.findOne({ email: "admin@ceygo.com" });
    if (existingAdmin) {
      console.log("Super Admin already exists");
      return mongoose.disconnect();
    }

    const hashedPassword = await bcrypt.hash("SuperSecure123", 10);

    const superAdmin = new Admin({
      name: "Super Admin",
      email: "admin@ceygo.com",
      password: hashedPassword,
      role: "admin"
    });

    await superAdmin.save();
    console.log("Super Admin created successfully!");
    mongoose.disconnect();
  } catch (err) {
    console.error(err);
    mongoose.disconnect();
  }
}

createSuperAdmin();