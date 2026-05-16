const Guide = require("../models/Guide");

// CREATE
const createGuide = async (req, res) => {
  try {
    const guide = await Guide.create(req.body);
    res.status(201).json(guide);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL
const getGuides = async (req, res) => {
  try {
    const data = await Guide.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE
const deleteGuide = async (req, res) => {
  try {
    await Guide.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createGuide, getGuides, deleteGuide };