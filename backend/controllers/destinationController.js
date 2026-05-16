const Destination = require("../models/Destination");
const axios = require("axios");

// ─── CREATE ───────────────────────────────────────────────────────────────────
const createDestination = async (req, res) => {
  try {
    const destination = await Destination.create(req.body);
    res.status(201).json(destination);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ─── GET ALL (with filters) ───────────────────────────────────────────────────
const getDestinations = async (req, res) => {
  try {
    const { popular, district, category, search, sort } = req.query;
    let query = {};

    if (popular === "true") query.rating = { $gte: 4.5 };
    if (district && district !== "All Districts") query.district = district;
    if (category && category !== "All") query.category = category;
    if (search) query.$or = [
      { name: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
      { location: { $regex: search, $options: "i" } },
    ];

    let dbQuery = Destination.find(query);

    if (sort === "rating") dbQuery = dbQuery.sort({ rating: -1 });
    else if (sort === "price_asc") dbQuery = dbQuery.sort({ price: 1 });
    else if (sort === "price_desc") dbQuery = dbQuery.sort({ price: -1 });
    else if (sort === "name") dbQuery = dbQuery.sort({ name: 1 });

    const data = await dbQuery;
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ─── GET SINGLE ───────────────────────────────────────────────────────────────
const getDestination = async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id);
    if (!destination) return res.status(404).json({ message: "Destination not found" });
    res.json(destination);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ─── UPDATE ───────────────────────────────────────────────────────────────────
const updateDestination = async (req, res) => {
  try {
    const updated = await Destination.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ message: "Destination not found" });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ─── DELETE ───────────────────────────────────────────────────────────────────
const deleteDestination = async (req, res) => {
  try {
    const deleted = await Destination.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Destination not found" });
    res.json({ message: "Destination deleted successfully", id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ─── WEATHER PROXY (keeps API key server-side) ────────────────────────────────
const getWeather = async (req, res) => {
  try {
    const { lat, lng } = req.query;
    if (!lat || !lng) return res.status(400).json({ message: "lat and lng are required" });

    const WEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;
    if (!WEATHER_API_KEY) return res.status(500).json({ message: "Weather API key not configured" });

    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${WEATHER_API_KEY}&units=metric`
    );

    const d = response.data;
    res.json({
      temp: Math.round(d.main.temp),
      feels: Math.round(d.main.feels_like),
      humidity: d.main.humidity,
      desc: d.weather[0].description,
      code: d.weather[0].id,
      wind: Math.round(d.wind.speed * 3.6),
      icon: d.weather[0].icon,
      location: d.name,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch weather", error: error.message });
  }
};

// ─── BULK IMPORT (Admin) ──────────────────────────────────────────────────────
const bulkCreateDestinations = async (req, res) => {
  try {
    const destinations = await Destination.insertMany(req.body, { ordered: false });
    res.status(201).json({ count: destinations.length, destinations });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createDestination,
  getDestinations,
  getDestination,
  deleteDestination,
  updateDestination,
  getWeather,
  bulkCreateDestinations,
};