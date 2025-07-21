const Plant = require('../models/Plant');
const { identifyPlantSpecies, generateCareTips } = require('../utils/ai');

// POST /api/plants/upload
const uploadPlant = async (req, res) => {
  try {
    const { photoUrl } = req.body;

    if (!photoUrl) {
      return res.status(400).json({ error: 'Missing photoUrl in request body' });
    }

    // 1. Identify plant
    const { species, suggestions } = await identifyPlantSpecies(photoUrl);

    // 2. Generate care tips from Gemini
    const { careTips, careTags, predictedDisease } = await generateCareTips(species, suggestions);

    // 3. Save to MongoDB
    const newPlant = new Plant({
      photoUrl,
      species,
      suggestions,
      careTips,
      careTags,
      predictedDisease,
    });

    await newPlant.save();

    res.status(201).json(newPlant);

  } catch (err) {
    console.error('❌ Upload failed:', err.message);
    res.status(400).json({ error: err.message || 'Unknown error during upload' });
  }
};


module.exports = { uploadPlant };
