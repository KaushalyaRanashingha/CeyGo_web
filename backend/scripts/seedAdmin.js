const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("./models/User"); 

const MONGO_URI = "mongodb://localhost:27017/ceygoAdmin"; 

async function createSuperAdmin() {
  await mongoose.connect(MONGO_URI);

  const existingAdmin = await User.findOne({ email: "admin@ceygo.com" });
  if (existingAdmin) {
    console.log("Super Admin already exists");
    return mongoose.disconnect();
  }

  const hashedPassword = await bcrypt.hash("SuperSecure123", 10);

  const superAdmin = new User({
    name: "Super Admin",
    email: "admin@ceygo.com",
    phone: "0000000000",
    IdNumber: "ADMIN001",
    role: "admin",
    businessname: "CeyGo",
    address: "Head Office",
    password: hashedPassword,
    status: "approved" 
  });

  await superAdmin.save();
  console.log("Super Admin created successfully!");
  mongoose.disconnect();
}

createSuperAdmin();