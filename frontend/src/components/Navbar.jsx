import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react'; // 🧩 Install lucide-react if not already

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-green-600 text-white shadow-md px-6 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* 🌿 Logo / Brand */}
        <div className="text-2xl font-bold tracking-wide">
          <Link to="/">🌿 Rutika AI</Link>
        </div>

        {/* 🧭 Desktop Links */}
        <div className="hidden md:flex gap-6 text-sm font-medium">
          <Link
            to="/"
            className={`px-4 py-2 rounded-md transition ${
              isActive('/') ? 'bg-green-800' : 'hover:bg-green-700'
            }`}
          >
            Home
          </Link>
          <Link
            to="/plant-details"
            className={`px-4 py-2 rounded-md transition ${
              isActive('/plant-details') ? 'bg-green-800' : 'hover:bg-green-700'
            }`}
          >
            Plant Details
          </Link>
        </div>

        {/* 📱 Mobile Menu Toggle */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* 📱 Mobile Links Dropdown */}
      {isOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-2 text-sm font-medium px-4">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className={`px-4 py-2 rounded-md transition ${
              isActive('/') ? 'bg-green-800' : 'hover:bg-green-700'
            }`}
          >
            Home
          </Link>
          <Link
            to="/plant-details"
            onClick={() => setIsOpen(false)}
            className={`px-4 py-2 rounded-md transition ${
              isActive('/plant-details') ? 'bg-green-800' : 'hover:bg-green-700'
            }`}
          >
            Plant Details
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
