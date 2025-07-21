const Plant = require('../models/Plant');
const { identifyPlantSpecies, generateCareTips } = require('../utils/ai');
const { cloudinary } = require('../utils/cloudinary');
const uploadPlant = async (req, res) => {
 
     
         try {
    let imageUrl = '';

    // Case 1: File upload
    if (req.file) {
      imageUrl = req.file.path;
    }

    // Case 2: URL input
    else if (req.body.photoUrl) {
      const result = await cloudinary.uploader.upload(req.body.photoUrl, {
        folder: 'plantpal_uploads',
        fetch_format: 'auto',
      });
      imageUrl = result.secure_url;
    }

    if (!imageUrl) {
      return res.status(400).json({ error: 'No image provided' });
    }

    const { species, suggestions } = await identifyPlantSpecies(imageUrl);
    const { careTips, careTags, predictedDisease } = await generateCareTips(species, suggestions);

    const newPlant = new Plant({
      photoUrl: imageUrl,
      species,
      suggestions,
      careTips,
      careTags,
      predictedDisease,
    });

    await newPlant.save();

    res.status(201).json(newPlant);

  } catch (err) {
    console.error('❌ Full upload error:', err.message);
    res.status(400).json({ error: err.message });
  }


    // Image uploaded to Cloudinary by multer
  //   const imageUrl = req.file.path;

  //   // Step 1: Identify plant
  //   const { species, suggestions } = await identifyPlantSpecies(imageUrl);

  //   // Step 2: Generate care tips using Gemini
  //   const { careTips, careTags, predictedDisease } = await generateCareTips(species, suggestions);

  //   // Step 3: Save to DB
  //   const newPlant = new Plant({
  //     photoUrl: imageUrl,
  //     species,
  //     suggestions,
  //     careTips,
  //     careTags,
  //     predictedDisease,
  //   });

  //   await newPlant.save();

  //   // Step 4: Send full result
  //   res.status(201).json(newPlant);

  // } catch (err) {
  //   console.error('❌ Full upload error:', err.message);
  //   res.status(400).json({ error: err.message });
  // }

}

module.exports = { uploadPlant };
