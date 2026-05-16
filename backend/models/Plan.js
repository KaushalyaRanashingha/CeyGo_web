const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema(
  {
    time: String,
    title: String,
    description: String,
    cost: String,
  },
  { _id: false }
);

const daySchema = new mongoose.Schema(
  {
    day: Number,
    place: String,
    weather: String,
    budget: String,
    activities: [activitySchema],
  },
  { _id: false }
);

const planSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    destination: {
      type: String,
      required: true,
    },
    days: [daySchema],

    // 🔥 THIS WAS MISSING — without it toggleFavorite never persists
    isFavorite: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Plan", planSchema);