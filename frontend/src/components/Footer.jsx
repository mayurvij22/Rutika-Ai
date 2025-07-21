import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="mt-20 border-t bg-gradient-to-r from-green-100 via-white to-green-100 py-6">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
        <div className="flex items-center gap-2 mb-4 md:mb-0">
          <Leaf className="text-green-600" size={20} />
          <span className="font-semibold text-green-700">Rutika AI</span>
        </div>

        <div className="flex gap-6 mb-4 md:mb-0">
          <Link to="/" className="hover:text-green-600 transition">Home</Link>
          <Link to="/plant-details" className="hover:text-green-600 transition">Plant Details</Link>
        </div>

        <p className="text-xs">&copy; {new Date().getFullYear()} Rutika AI. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
