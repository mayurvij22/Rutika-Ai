import React from 'react';
import { motion } from 'framer-motion';

const PlantDetailsPage = () => {
  const plantData = JSON.parse(sessionStorage.getItem('plantData'));

  if (!plantData) {
    return <p className="p-4">No plant data found.</p>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-lg"
    >
      <h2 className="text-xl font-semibold mb-4">🌱 Plant Analysis Result</h2>
      <img
        src={plantData.photoUrl}
        alt="Plant"
        className="w-full md:w-96 mx-auto rounded-md mb-4"
      />
      <p><strong>Species:</strong> {plantData.species}</p>
      <p><strong>Care Tips:</strong> {plantData.careTips}</p>
      <p><strong>Care Tags:</strong> {plantData.careTags.join(', ')}</p>
      <p><strong>Predicted Disease:</strong> {plantData.predictedDisease}</p>
    </motion.div>
  );
};

export default PlantDetailsPage;
