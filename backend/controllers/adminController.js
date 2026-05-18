const Destination = require("../models/Destination");

// ─── Admin: Destinations management page ──────────────────────────────────────
exports.destinationsPage = async (req, res) => {
  try {
    const { search, district, category } = req.query;

    let query = {};
    if (district && district !== "") query.district = district;
    if (category && category !== "") query.category = category;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } },
      ];
    }

    const destinations = await Destination.find(query).sort({ createdAt: -1 });

    res.render("admin/destinations", {
      admin: req.admin,
      destinations,
      search: search || "",
      successMsg: req.session?.successMsg || null,
      errorMsg: req.session?.errorMsg || null,
    });

    // Clear flash after render
    if (req.session) {
      req.session.successMsg = null;
      req.session.errorMsg = null;
    }
  } catch (error) {
    console.error("Admin destinations page error:", error);
    res.render("admin/destinations", {
      admin: req.admin,
      destinations: [],
      search: "",
      errorMsg: "Failed to load destinations from database.",
    });
  }
};

// ─── Admin: Dashboard ──────────────────────────────────────────────────────────
exports.dashboard = async (req, res) => {
  try {
    const totalDestinations = await Destination.countDocuments();
    const activeDestinations = await Destination.countDocuments({ isActive: true });
    const topRated = await Destination.find({ rating: { $gte: 4.8 } }).countDocuments();

    res.render("admin/dashboard", {
      title: "Admin Dashboard",
      admin: req.admin,
      stats: { totalDestinations, activeDestinations, topRated },
    });
  } catch (error) {
    res.render("admin/dashboard", {
      title: "Admin Dashboard",
      admin: req.admin,
      stats: { totalDestinations: 0, activeDestinations: 0, topRated: 0 },
    });
  }
};