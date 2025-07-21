import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, ShieldAlert, Sparkles } from 'lucide-react';

const PlantDetailsPage = () => {
  const plantData = JSON.parse(sessionStorage.getItem('plantData'));

  if (!plantData) {
    return <p className="p-6 text-center text-red-600">❌ No plant data found. Please upload a plant first.</p>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-xl mt-12 mb-12"
    >
      <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">🌿 Plant Analysis Result</h2>

      <div className="flex flex-col md:flex-row items-center gap-8">
        {/* Image Section */}
        <img
          src={plantData.photoUrl}
          alt="Uploaded Plant"
          className="w-full md:w-80 rounded-lg border border-green-200 shadow-md"
        />

        {/* Details Section */}
        <div className="space-y-4 w-full">
          <div className="flex items-center gap-2 text-lg">
            <Leaf className="text-green-600" />
            <p><strong className="text-green-800">Species:</strong> {plantData.species}</p>
          </div>

          <div className="flex items-start gap-2 text-lg">
            <Sparkles className="text-yellow-600 mt-1" />
            <div>
              <strong className="text-green-800">Suggestions:</strong>
              {plantData.suggestions?.length > 0 ? (
                <ul className="list-disc ml-5 mt-1 text-sm text-gray-700">
                  {plantData.suggestions.map((sug, i) => (
                    <li key={i}>
                      <span className="font-medium text-green-700">{sug.name}</span> ({(sug.probability * 100).toFixed(1)}%): {sug.description}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No suggestions available.</p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 text-lg">
            <Sparkles className="text-yellow-600" />
            <p><strong className="text-green-800">Care Tips:</strong> {plantData.careTips || 'No tips available.'}</p>
          </div>

          <div className="flex items-center gap-2 text-lg">
            <Leaf className="text-lime-600" />
            <p>
              <strong className="text-green-800">Care Tags:</strong>{' '}
              {plantData.careTags?.length > 0 ? plantData.careTags.join(', ') : 'None'}
            </p>
          </div>

          <div className="flex items-center gap-2 text-lg">
            <ShieldAlert className="text-red-500" />
            <p>
              <strong className="text-green-800">Predicted Disease:</strong>{' '}
              {plantData.predictedDisease || 'Healthy 🌱'}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PlantDetailsPage;
