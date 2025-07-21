const mongoose = require('mongoose');

const SuggestionSchema = new mongoose.Schema({
  name: String,
  probability: Number,
  description: String,
});

const PlantSchema = new mongoose.Schema({
  photoUrl: { type: String},
  species: { type: String },
  suggestions: [SuggestionSchema],        // Top 3 matches from Plant ID API
  careTags: [String],                     // Watering / Sunlight tags
  careTips: String,                       // AI-generated from Gemini
  predictedDisease: String,               // Predicted disease (AI)
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Plant', PlantSchema);
