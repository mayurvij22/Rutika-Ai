const express = require('express');
const router = express.Router();
const { upload } = require('../utils/cloudinary');
const { uploadPlant } = require('../controllers/plantController');

// // Upload image to Cloudinary
// router.post('/upload-image', upload.single('image'), (req, res) => {
//   try {
//     const imageUrl = req.file.path;
//     res.status(200).json({ imageUrl });
//   } catch (err) {
//     res.status(500).json({ error: 'Image upload failed' });
//   }
// });

// // Process image URL → Identify Plant + Tips
// router.post('/upload', uploadPlant);



// 🔁 One-step upload and AI processing
router.post('/full-upload', upload.single('image'), uploadPlant);

module.exports = router;




module.exports = router;

