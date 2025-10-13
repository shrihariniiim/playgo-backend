

import { Schema, model } from "mongoose";

const venueSchema = new Schema({
  name: { type: String, required: true },
  address: String,
  rating: Number,
  featured: Boolean,
  imageUrl: String,
  courts: [String], // Array of court names
  pricePer30Min: { type: Number, default: 210 }, // Default price per 30 min
  sport: String,
});

const locationSchema = new Schema({
  location: { type: String, required: true, unique: true },
  venues: [venueSchema],
});

export default model("Location", locationSchema);