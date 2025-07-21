import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const UploadForm = () => {
  const [photoUrl, setPhotoUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!photoUrl.trim()) {
      toast.warn('⚠️ Please enter a photo URL!');
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post('https://rutika-ai.onrender.com/api/plants/upload', { photoUrl });

      sessionStorage.setItem('plantData', JSON.stringify(res.data));
      toast.success('✅ Plant uploaded and analyzed!');
      navigate('/plant-details');
    } catch (error) {
      const errorMsg = error.response?.data?.error || 'Upload failed';
      toast.error(`❌ ${errorMsg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto mt-8 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-green-700">🌿 Upload a Plant Image URL</h2>
      <p className="text-sm text-gray-600 mb-4">
        Paste the image URL of your plant below. Our AI (Rutika AI 🌱) will analyze it and give you care tips.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row items-center gap-4">
        <input
          type="text"
          placeholder="e.g. https://images.plantid.com/my-plant.jpg"
          value={photoUrl}
          onChange={(e) => setPhotoUrl(e.target.value)}
          className="w-full md:w-2/3 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
          type="submit"
          disabled={loading}
          className={`px-6 py-2 rounded-md text-white transition ${
            loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          {loading ? 'Uploading...' : 'Upload'}
        </button>
      </form>

      {photoUrl && (
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500 mb-2">Preview:</p>
          <img
            src={photoUrl}
            alt="Preview"
            className="mx-auto max-h-64 rounded-lg shadow-md border"
          />
        </div>
      )}
    </div>
  );
};

export default UploadForm;
