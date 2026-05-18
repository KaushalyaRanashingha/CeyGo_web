/**
 * UserDestination.js — Model
 *
 * Records every destination a logged-in user selects on the map.
 * Fields are deliberately denormalised (name, image, coordinates stored
 * inline) so admin analytics queries run without additional joins and the
 * record remains self-contained even if the source Destination document
 * is later updated.
 *
 * Collection: userdestinations
 */

const mongoose = require("mongoose");

const userDestinationSchema = new mongoose.Schema(
  {
    // ── Who selected it ─────────────────────────────────────────────
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "userId is required"],
      index: true,
    },

    // ── What they selected (denormalised snapshot) ───────────────────
    // destinationId links back to the Destination catalogue when present.
    // It is optional because Destinations.jsx uses a hardcoded ALL_PLACES
    // array that does not yet have MongoDB _ids. Wire this up once you
    // move the destination catalogue into MongoDB.
    destinationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Destination",
      default: null,
    },

    name: {
      type: String,
      required: [true, "Destination name is required"],
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    image: {
      type: String,
      default: "",
    },

    district: {
      type: String,
      enum: ["Galle", "Matara", "Hambantota", "Deniyaya", "Other"],
      default: "Other",
    },

    category: {
      type: String,
      enum: [
        "Beaches",
        "Historical",
        "Wildlife",
        "Adventure",
        "Cultural",
        "Nature",
        "Luxury",
        "Food",
        "Other",
      ],
      default: "Other",
    },

    coordinates: {
      lat: {
        type: Number,
        required: [true, "Latitude is required"],
        min: -90,
        max: 90,
      },
      lng: {
        type: Number,
        required: [true, "Longitude is required"],
        min: -180,
        max: 180,
      },
    },

    // ── Analytics helpers ────────────────────────────────────────────
    // selectedDate is set by the server (not trusted from the client).
    selectedDate: {
      type: Date,
      default: Date.now,
      index: true,
    },

    // viewCount lets the admin dashboard show "most viewed" stats.
    // Increment this via PATCH /api/destinations/view/:id.
    viewCount: {
      type: Number,
      default: 1,
      min: 0,
    },

    // Track whether the user later removed this from their selection.
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  {
    timestamps: true, // adds createdAt + updatedAt
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// ── Compound indexes for the queries used by the admin dashboard ──────────────
// "Most selected destinations overall"
userDestinationSchema.index({ name: 1, isActive: 1 });
// "What did a specific user select?"
userDestinationSchema.index({ userId: 1, isActive: 1 });
// "Popularity by district"
userDestinationSchema.index({ district: 1, isActive: 1 });
// "Recent selections" (used in the admin recent-activity feed)
userDestinationSchema.index({ selectedDate: -1 });

// ── Virtual: Google Maps deep-link ───────────────────────────────────────────
userDestinationSchema.virtual("mapsUrl").get(function () {
  const { lat, lng } = this.coordinates || {};
  if (lat != null && lng != null) {
    return `https://maps.google.com/?q=${lat},${lng}`;
  }
  return null;
});

module.exports =
  mongoose.models.UserDestination ||
  mongoose.model("UserDestination", userDestinationSchema);