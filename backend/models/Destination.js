const mongoose = require("mongoose");

const destinationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Destination name is required"],
      trim: true,
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
    },
    district: {
      type: String,
      enum: ["Galle", "Matara", "Hambantota", "Deniyaya"],
      required: [true, "District is required"],
    },
    category: {
      type: String,
      enum: ["Beaches", "Historical", "Wildlife", "Adventure", "Cultural", "Nature", "Luxury", "Food"],
      required: [true, "Category is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    image: {
      type: String,
      default: "",
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    price: {
      type: Number,
      default: 0,
    },
    duration: {
      type: String,
      default: "Half Day",
    },
    // GPS coordinates for maps & weather
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
    highlights: {
      type: [String],
      default: [],
    },
    bestTime: {
      type: String,
      default: "Year Round",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual: Google Maps link
destinationSchema.virtual("mapsUrl").get(function () {
  if (this.coordinates?.lat && this.coordinates?.lng) {
    return `https://maps.google.com/?q=${this.coordinates.lat},${this.coordinates.lng}`;
  }
  return null;
});

// Index for search performance
destinationSchema.index({ district: 1, category: 1 });
destinationSchema.index({ rating: -1 });
destinationSchema.index({ name: "text", description: "text", location: "text" });

module.exports = mongoose.models.Destination || mongoose.model("Destination", destinationSchema);