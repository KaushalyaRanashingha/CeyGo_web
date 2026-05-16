const Plan = require("../models/Plan");

// SAVE PLAN
exports.savePlan = async (req, res) => {
  try {
    let { destination, days } = req.body;

    // 🔥 Convert string to JSON if needed
    if (typeof days === "string") {
      try {
        days = JSON.parse(days);
      } catch (err) {
        days = [];
      }
    }

    // 🔥 Ensure days is always array
    if (!Array.isArray(days)) {
      days = Object.values(days || {});
    }

    const plan = await Plan.create({
      userId: req.user.id,
      destination,
      days,
    });

    res.status(201).json(plan);
  } catch (err) {
    console.log("SAVE PLAN ERROR:", err);
    res.status(500).json({
      message: "Failed to save plan",
    });
  }
};

// GET USER PLANS
exports.getPlans = async (req, res) => {
  try {
    const plans = await Plan.find({
      userId: req.user.id,
    }).sort({ createdAt: -1 });

    res.json(plans);
  } catch (err) {
    console.log("GET PLANS ERROR:", err);

    res.status(500).json({
      message: "Failed to fetch plans",
    });
  }
};

// DELETE PLAN
exports.deletePlan = async (req, res) => {
  try {
    const plan = await Plan.findById(req.params.id);

    if (!plan) {
      return res.status(404).json({
        message: "Plan not found",
      });
    }

    // 🔥 Security check
    if (plan.userId.toString() !== req.user.id) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    await Plan.findByIdAndDelete(req.params.id);

    res.json({
      message: "Plan deleted successfully",
    });
  } catch (err) {
    console.log("DELETE PLAN ERROR:", err);

    res.status(500).json({
      message: "Failed to delete plan",
    });
  }
};

// TOGGLE FAVORITE
exports.toggleFavorite = async (req, res) => {
  try {
    const plan = await Plan.findById(req.params.id);

    if (!plan) {
      return res.status(404).json({ message: "Plan not found" });
    }

    if (plan.userId.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    plan.isFavorite = !plan.isFavorite;
    await plan.save();

    res.json(plan);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};