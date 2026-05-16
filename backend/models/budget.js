const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema(
  {
    userId: { type: String },
    hotel: Number,
    transport: Number,
    food: Number,
    activities: Number,
    total: Number,
  },
  { timestamps: true },
);

module.exports = mongoose.models.Budget || mongoose.model("Budget", budgetSchema);