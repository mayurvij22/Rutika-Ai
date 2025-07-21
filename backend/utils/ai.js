const axios = require('axios');

const PLANT_ID_API_KEY = process.env.PLANT_ID_API_KEY;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;


console.log('🌿 Plant ID API Key:', PLANT_ID_API_KEY);

async function identifyPlantSpecies(photoUrl) {
  try {
    const payload = {
      images: [photoUrl],
      modifiers: ['similar_images=true', 'health=auto'], // ✅ correct format
      plant_language: 'en',
      plant_details: ['common_names', 'url', 'description'],
    };

    const response = await axios.post(
      'https://api.plant.id/v2/identify',
      payload,
      {
        headers: {
          'Content-Type': 'application/json',
          'Api-Key': process.env.PLANT_ID_API_KEY, // Make sure this is in your .env
        },
      }
    );

    const data = response.data;

    if (!data.suggestions || data.suggestions.length === 0) {
      throw new Error('No plant matches found');
    }

    // Take the top match
    const species = data.suggestions[0].plant_name;

    // Extract top 3 suggestions with name, probability, description
    const suggestions = data.suggestions.slice(0, 3).map((sug) => ({
      name: sug.plant_name,
      probability: sug.probability,
      description: sug.plant_details?.description?.value || 'No description available',
    }));

    return { species, suggestions };
  } catch (err) {
    console.error('❌ Plant ID API Error:', err.response?.data || err.message);
    throw new Error('Plant identification failed: ' + (err.response?.data?.message || err.message));
  }
}






const generateCareTips = async (species, suggestions) => {
  const prompt = `
You are a plant care expert. Based on this plant species: "${species}", and related species: 
${suggestions.map(s => s.name).join(', ')}, give:

1. Short care tips (max 80 words)
2. 2-3 care tags (e.g., "Low sunlight", "Medium watering")
3. Likely disease this plant may suffer from

Respond in JSON:
{
  "careTips": "...",
  "careTags": ["...", "..."],
  "predictedDisease": "..."
}
`;

  const response = await axios.post(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
    {
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
    }
  );

  const text = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || '{}';

  // ✅ Strip Markdown-style JSON block if present
  const cleanText = text.replace(/^```json\s*|\s*```$/g, '').trim();

  try {
    const cleanJSON = JSON.parse(cleanText);
    return cleanJSON;
  } catch (err) {
    console.error('❌ Failed to parse Gemini response JSON:', err.message);
    throw new Error('Invalid JSON format from Gemini response');
  }
};


module.exports = {
  identifyPlantSpecies,
  generateCareTips
};



