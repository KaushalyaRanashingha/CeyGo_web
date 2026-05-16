const Hotel = require("../models/Hotel");

/* CREATE HOTEL */
const createHotel = async (req, res) => {
  try {
    const hotel = await Hotel.create(req.body);

    res.status(201).json(hotel);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/* GET ALL HOTELS */
const getHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find();

    res.json(hotels);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/* GET SINGLE HOTEL */
const getHotelById = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);

    if (!hotel) {
      return res.status(404).json({
        message: "Hotel not found",
      });
    }

    res.json(hotel);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/* UPDATE HOTEL */
const updateHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json(hotel);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/* DELETE HOTEL */
const deleteHotel = async (req, res) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);

    res.json({
      message: "Hotel deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createHotel,
  getHotels,
  getHotelById,
  updateHotel,
  deleteHotel,
};