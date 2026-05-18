/**
 * routes/destinations.js — Destination Selection API
 *
 * Mount in your main Express app:
 *   const destinationRoutes = require('./routes/destinations');
 *   app.use('/api/destinations', destinationRoutes);
 *
 * Endpoints
 * ─────────────────────────────────────────────────────────────────────────────
 *  POST   /api/destinations/select          Save a selected destination (auth)
 *  POST   /api/destinations/select/batch    Save multiple at once (auth)
 *  GET    /api/destinations/selected        User's selection history (auth)
 *  PATCH  /api/destinations/deselect/:id   Soft-delete a selection (auth)
 *  DELETE /api/destinations/selected/clear  Remove all user selections (auth)
 *  GET    /api/destinations/stats           Admin analytics (admin only)
 *  GET    /api/destinations                 Public destination catalogue
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * Dependencies (already in your package.json):
 *   express  mongoose  jsonwebtoken
 *
 * Environment variables expected:
 *   JWT_SECRET   — same secret used when signing tokens at login
 */

const express  = require("express");
const jwt      = require("jsonwebtoken");
const mongoose = require("mongoose");

const UserDestination = require("../models/UserDestination");
const Destination     = require("../models/Destination");    // catalogue model

const router = express.Router();

// ─── Auth middleware ──────────────────────────────────────────────────────────
/**
 * verifyToken
 * Reads the Bearer token from Authorization header, verifies it with
 * JWT_SECRET, then attaches the decoded payload to req.user.
 * Keeps the route handlers clean — all they see is req.user.id / req.user.role.
 */
function verifyToken(req, res, next) {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "No token provided. Please log in." });
  }

  const token = header.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, email, role, iat, exp }
    next();
  } catch (err) {
    const message =
      err.name === "TokenExpiredError"
        ? "Session expired. Please log in again."
        : "Invalid token. Please log in.";
    return res.status(401).json({ success: false, message });
  }
}

/**
 * requireAdmin
 * Must be used AFTER verifyToken. Rejects non-admin callers with 403.
 */
function requireAdmin(req, res, next) {
  if (req.user?.role !== "admin" && !req.user?.isAdmin) {
    return res.status(403).json({ success: false, message: "Admin access required." });
  }
  next();
}

// ─── Validation helper ────────────────────────────────────────────────────────
/**
 * validateSelectionBody
 * Checks that the minimum required fields are present and that lat/lng are
 * valid numbers in the correct ranges. Returns a human-readable error string
 * or null if everything is fine.
 */
function validateSelectionBody({ name, lat, lng }) {
  if (!name || typeof name !== "string" || name.trim().length === 0) {
    return "Destination name is required.";
  }

  const latNum = parseFloat(lat);
  const lngNum = parseFloat(lng);

  if (isNaN(latNum) || latNum < -90 || latNum > 90) {
    return "lat must be a number between -90 and 90.";
  }
  if (isNaN(lngNum) || lngNum < -180 || lngNum > 180) {
    return "lng must be a number between -180 and 180.";
  }

  return null; // valid
}

// ─── Allowed field lists ──────────────────────────────────────────────────────
const VALID_DISTRICTS  = ["Galle", "Matara", "Hambantota", "Deniyaya", "Other"];
const VALID_CATEGORIES = [
  "Beaches", "Historical", "Wildlife", "Adventure",
  "Cultural", "Nature", "Luxury", "Food", "Other",
];

// ─── Routes ───────────────────────────────────────────────────────────────────

// ── 1. POST /api/destinations/select ─────────────────────────────────────────
/**
 * Save a single user-selected destination.
 *
 * Request body (sent by Destinations.jsx handleSelect()):
 * {
 *   name:        "Galle Fort",
 *   description: "A UNESCO World Heritage Site…",
 *   image:       "https://…",
 *   district:    "Galle",
 *   category:    "Historical",
 *   lat:         6.0278,
 *   lng:         80.2168,
 *   destinationId: "665abc…"   // optional — MongoDB _id if available
 * }
 *
 * Response 201:
 * {
 *   success: true,
 *   message: "Destination saved.",
 *   data: { <UserDestination document> }
 * }
 *
 * Idempotent: if the user already has an active selection for the same
 * destination name, the existing record's viewCount is incremented rather
 * than creating a duplicate.
 */
router.post("/select", verifyToken, async (req, res) => {
  try {
    const {
      name,
      description = "",
      image       = "",
      district,
      category,
      lat,
      lng,
      destinationId,
    } = req.body;

    // Validate required fields
    const validationError = validateSelectionBody({ name, lat, lng });
    if (validationError) {
      return res.status(400).json({ success: false, message: validationError });
    }

    const userId  = req.user.id;
    const latNum  = parseFloat(lat);
    const lngNum  = parseFloat(lng);

    // Sanitise enum values — fall back to "Other" if the client sends
    // something unexpected (e.g. a category added to the front-end but
    // not yet in the schema).
    const safeDistrict  = VALID_DISTRICTS.includes(district)  ? district  : "Other";
    const safeCategory  = VALID_CATEGORIES.includes(category) ? category  : "Other";

    // ── Idempotency check ─────────────────────────────────────────────
    // If the user already selected this destination in the same session
    // (same userId + same name, still active), bump the view count
    // instead of inserting a duplicate row.
    const existing = await UserDestination.findOne({
      userId,
      name: name.trim(),
      isActive: true,
    });

    if (existing) {
      existing.viewCount += 1;
      await existing.save();
      return res.status(200).json({
        success: true,
        message: "Selection already recorded — view count updated.",
        data: existing,
      });
    }

    // ── Create new selection record ───────────────────────────────────
    const selection = await UserDestination.create({
      userId,
      destinationId: destinationId && mongoose.isValidObjectId(destinationId)
        ? destinationId
        : null,
      name:        name.trim(),
      description: description.trim(),
      image,
      district:    safeDistrict,
      category:    safeCategory,
      coordinates: { lat: latNum, lng: lngNum },
      selectedDate: new Date(),
      viewCount:   1,
      isActive:    true,
    });

    return res.status(201).json({
      success: true,
      message: "Destination saved successfully.",
      data: selection,
    });

  } catch (err) {
    console.error("[POST /destinations/select]", err);
    return res.status(500).json({ success: false, message: "Server error while saving destination." });
  }
});


// ── 2. POST /api/destinations/select/batch ────────────────────────────────────
/**
 * Save the entire selected-places array in one request.
 * Called when the user clicks "Show Route Map" or "Plan Your Trip" after
 * selecting multiple destinations — fires one network request instead of N.
 *
 * Request body:
 * {
 *   destinations: [
 *     { name, description, image, district, category, lat, lng },
 *     …
 *   ]
 * }
 *
 * Response 201:
 * {
 *   success: true,
 *   saved:   3,     // how many were newly created
 *   updated: 1,     // how many already existed (viewCount bumped)
 *   data: [ … ]
 * }
 */
router.post("/select/batch", verifyToken, async (req, res) => {
  try {
    const { destinations } = req.body;

    if (!Array.isArray(destinations) || destinations.length === 0) {
      return res.status(400).json({ success: false, message: "destinations must be a non-empty array." });
    }
    if (destinations.length > 50) {
      return res.status(400).json({ success: false, message: "Maximum 50 destinations per batch." });
    }

    const userId  = req.user.id;
    const results = { saved: 0, updated: 0, data: [] };

    // Process in sequence to keep the idempotency logic simple.
    // For very large batches you could use Promise.all, but 50 items
    // is well within serial-processing limits.
    for (const dest of destinations) {
      const { name, description = "", image = "", district, category, lat, lng, destinationId } = dest;

      const validationError = validateSelectionBody({ name, lat, lng });
      if (validationError) continue; // skip invalid entries silently

      const latNum = parseFloat(lat);
      const lngNum = parseFloat(lng);
      const safeDistrict  = VALID_DISTRICTS.includes(district)  ? district  : "Other";
      const safeCategory  = VALID_CATEGORIES.includes(category) ? category  : "Other";

      const existing = await UserDestination.findOne({ userId, name: name.trim(), isActive: true });

      if (existing) {
        existing.viewCount += 1;
        await existing.save();
        results.updated++;
        results.data.push(existing);
      } else {
        const created = await UserDestination.create({
          userId,
          destinationId: destinationId && mongoose.isValidObjectId(destinationId) ? destinationId : null,
          name:        name.trim(),
          description: description.trim(),
          image,
          district:    safeDistrict,
          category:    safeCategory,
          coordinates: { lat: latNum, lng: lngNum },
          selectedDate: new Date(),
          viewCount:   1,
          isActive:    true,
        });
        results.saved++;
        results.data.push(created);
      }
    }

    return res.status(201).json({ success: true, ...results });

  } catch (err) {
    console.error("[POST /destinations/select/batch]", err);
    return res.status(500).json({ success: false, message: "Server error during batch save." });
  }
});


// ── 3. GET /api/destinations/selected ────────────────────────────────────────
/**
 * Return all destinations the logged-in user has selected.
 * Used by the My Account page and the guide booking form (auto-fill).
 *
 * Query params:
 *   ?active=true          Only active selections (default true)
 *   ?limit=20             Max results (default 50, max 100)
 *   ?sort=recent|name     Sort order (default: recent)
 */
router.get("/selected", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;

    const activeOnly = req.query.active !== "false"; // default: active only
    const limit      = Math.min(parseInt(req.query.limit) || 50, 100);
    const sortField  = req.query.sort === "name" ? { name: 1 } : { selectedDate: -1 };

    const filter = { userId, ...(activeOnly ? { isActive: true } : {}) };

    const selections = await UserDestination.find(filter)
      .sort(sortField)
      .limit(limit)
      .lean(); // plain JS objects — faster when you don't need Mongoose methods

    return res.status(200).json({
      success: true,
      count:   selections.length,
      data:    selections,
    });

  } catch (err) {
    console.error("[GET /destinations/selected]", err);
    return res.status(500).json({ success: false, message: "Server error fetching selections." });
  }
});


// ── 4. PATCH /api/destinations/deselect/:id ──────────────────────────────────
/**
 * Soft-delete a single selection (sets isActive: false).
 * Called when the user clicks the ✕ button on a selected place pill.
 *
 * The record is kept for analytics — the admin can still see that the user
 * visited and deselected a destination.
 */
router.patch("/deselect/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ success: false, message: "Invalid selection ID." });
    }

    const selection = await UserDestination.findOne({
      _id:    id,
      userId: req.user.id, // users can only deselect their own records
    });

    if (!selection) {
      return res.status(404).json({ success: false, message: "Selection not found." });
    }

    selection.isActive = false;
    await selection.save();

    return res.status(200).json({ success: true, message: "Destination deselected.", data: selection });

  } catch (err) {
    console.error("[PATCH /destinations/deselect/:id]", err);
    return res.status(500).json({ success: false, message: "Server error." });
  }
});


// ── 5. DELETE /api/destinations/selected/clear ───────────────────────────────
/**
 * Soft-delete all active selections for the logged-in user.
 * Called from the "Clear" button in the SelectedBar component.
 */
router.delete("/selected/clear", verifyToken, async (req, res) => {
  try {
    const result = await UserDestination.updateMany(
      { userId: req.user.id, isActive: true },
      { $set: { isActive: false } }
    );

    return res.status(200).json({
      success:  true,
      message:  "All selections cleared.",
      cleared:  result.modifiedCount,
    });

  } catch (err) {
    console.error("[DELETE /destinations/selected/clear]", err);
    return res.status(500).json({ success: false, message: "Server error." });
  }
});


// ── 6. GET /api/destinations/stats ───────────────────────────────────────────
/**
 * Admin analytics — most selected destinations, daily activity, etc.
 * Requires admin role (verifyToken + requireAdmin).
 *
 * Response:
 * {
 *   topDestinations: [{ name, district, category, totalSelections, image }],
 *   recentSelections: [{ name, userId, selectedDate, … }],
 *   byDistrict: [{ _id: "Galle", count: 142 }],
 *   byCategory: [{ _id: "Beaches", count: 89 }],
 *   totalSelections: 412,
 *   activeUsers: 78
 * }
 */
router.get("/stats", verifyToken, requireAdmin, async (req, res) => {
  try {
    const [
      topDestinations,
      recentSelections,
      byDistrict,
      byCategory,
      totalSelections,
      activeUsers,
    ] = await Promise.all([

      // Most selected destinations (top 10)
      UserDestination.aggregate([
        { $match: { isActive: true } },
        {
          $group: {
            _id:             "$name",
            totalSelections: { $sum: 1 },
            totalViews:      { $sum: "$viewCount" },
            district:        { $first: "$district" },
            category:        { $first: "$category" },
            image:           { $first: "$image" },
          },
        },
        { $sort: { totalSelections: -1 } },
        { $limit: 10 },
        {
          $project: {
            _id:             0,
            name:            "$_id",
            totalSelections: 1,
            totalViews:      1,
            district:        1,
            category:        1,
            image:           1,
          },
        },
      ]),

      // 20 most recent selections across all users
      UserDestination.find({ isActive: true })
        .sort({ selectedDate: -1 })
        .limit(20)
        .populate("userId", "name email") // attach user name + email
        .lean(),

      // Breakdown by district
      UserDestination.aggregate([
        { $match: { isActive: true } },
        { $group: { _id: "$district", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ]),

      // Breakdown by category
      UserDestination.aggregate([
        { $match: { isActive: true } },
        { $group: { _id: "$category", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ]),

      // Total active selection records
      UserDestination.countDocuments({ isActive: true }),

      // Distinct users who have made at least one selection
      UserDestination.distinct("userId").then((ids) => ids.length),
    ]);

    return res.status(200).json({
      success: true,
      data: {
        topDestinations,
        recentSelections,
        byDistrict,
        byCategory,
        totalSelections,
        activeUsers,
      },
    });

  } catch (err) {
    console.error("[GET /destinations/stats]", err);
    return res.status(500).json({ success: false, message: "Server error fetching stats." });
  }
});


// ── 7. GET /api/destinations ─────────────────────────────────────────────────
/**
 * Public catalogue — list all active destinations from the DB.
 * Useful once you migrate the hardcoded ALL_PLACES array in Destinations.jsx
 * into MongoDB. Until then, the front-end continues using its local array.
 *
 * Query params:
 *   ?district=Galle
 *   ?category=Beaches
 *   ?search=fort
 *   ?limit=20
 *   ?sort=rating|-rating|name
 */
router.get("/", async (req, res) => {
  try {
    const { district, category, search, limit = 50, sort = "-rating" } = req.query;

    const filter = { isActive: true };
    if (district) filter.district = district;
    if (category) filter.category = category;
    if (search)   filter.$text    = { $search: search };

    const allowedSorts = ["rating", "-rating", "name", "-name", "price", "-price"];
    const safeSort = allowedSorts.includes(sort) ? sort : "-rating";

    const destinations = await Destination.find(filter)
      .sort(safeSort)
      .limit(Math.min(parseInt(limit), 100))
      .lean();

    return res.status(200).json({
      success: true,
      count:   destinations.length,
      data:    destinations,
    });

  } catch (err) {
    console.error("[GET /destinations]", err);
    return res.status(500).json({ success: false, message: "Server error fetching destinations." });
  }
});


module.exports = router;