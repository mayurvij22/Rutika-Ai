import React from 'react';
import UploadForm from '../components/UploadForm';
import { motion } from 'framer-motion';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { Sparkles, Bot, Leaf } from 'lucide-react';
import Footer from '../components/Footer';

const HomePage = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.6 }}
    className="min-h-screen bg-gradient-to-br from-green-100 via-white to-green-200 py-12 px-4"
  >
    {/* 🌱 Hero Section */}
    <div className="max-w-4xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-8 bg-white p-8 rounded-2xl shadow-lg">
      <div className="text-center md:text-left space-y-4">
        <h1 className="text-4xl font-bold text-green-700">Welcome to Rutika AI 🌿</h1>
        <p className="text-gray-600 text-lg">
          Upload a plant image to identify its species, check its health, and get personalized care tips.
        </p>
      </div>
      <div className="w-full md:w-1/2">
        <DotLottieReact
          src="https://lottie.host/a221baaa-f6c5-436b-8312-fecd50e10f62/P9hX8UsnVM.lottie"
          loop
          autoplay
        />
      </div>
    </div>

    {/* 🌿 Upload Form Section */}
    <div className="max-w-3xl mx-auto mt-10 bg-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-semibold text-green-800 mb-4">🌿 Upload Your Plant</h2>
      <UploadForm />
    </div>

    {/* 🧠 AI Info Section */}
    <div className="max-w-5xl mx-auto mt-12 bg-white p-8 rounded-xl shadow-md space-y-6 text-center">
      <h3 className="text-3xl font-bold text-green-700">🤖 What is Rutika AI?</h3>
      <p className="text-gray-700 text-lg max-w-3xl mx-auto">
        Rutika AI is your intelligent plant companion, combining computer vision and deep learning to help you take care of your green friends 🌿.
      </p>

      <div className="grid md:grid-cols-3 gap-6 mt-6 text-left">
        <div className="flex items-start gap-4">
          <Bot className="text-green-600 mt-1" />
          <div>
            <h4 className="font-semibold text-green-800 text-lg">Smart Identification</h4>
            <p className="text-gray-600 text-sm">
              Instantly recognize plant species using AI image recognition trained on thousands of plants.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <Leaf className="text-green-600 mt-1" />
          <div>
            <h4 className="font-semibold text-green-800 text-lg">Health Diagnosis</h4>
            <p className="text-gray-600 text-sm">
              Detect diseases, nutrient issues, and stress levels in your plant with just a photo.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <Sparkles className="text-green-600 mt-1" />
          <div>
            <h4 className="font-semibold text-green-800 text-lg">Personalized Care</h4>
            <p className="text-gray-600 text-sm">
              Receive actionable tips on watering, sunlight, soil, and more tailored to your plant.
            </p>
          </div>
        </div>
      </div>
    </div>
   
  </motion.div>
);

export default HomePage;
