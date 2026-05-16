const Budget = require("../models/Budget");

// CREATE BUDGET
const createBudget = async (req, res) => {
  try {
    const { hotel, transport, food, activities } = req.body;

    const total =
      Number(hotel) + Number(transport) + Number(food) + Number(activities);

    const budget = await Budget.create({
      hotel,
      transport,
      food,
      activities,
      total,
    });

    res.status(201).json(budget);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL BUDGETS
const getBudgets = async (req, res) => {
  try {
    const budgets = await Budget.find().sort({ createdAt: -1 });
    res.json(budgets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE
const deleteBudget = async (req, res) => {
  try {
    await Budget.findByIdAndDelete(req.params.id);
    res.json({ message: "Budget deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createBudget,
  getBudgets,
  deleteBudget,
};