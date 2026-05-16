const Driver = require("../models/Driver");

// CREATE
const createDriver = async (req, res) => {
  try {
    const driver = await Driver.create(req.body);
    res.status(201).json(driver);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL
const getDrivers = async (req, res) => {
  try {
    const data = await Driver.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE
const deleteDriver = async (req, res) => {
  try {
    await Driver.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createDriver, getDrivers, deleteDriver };