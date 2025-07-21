import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { AnimatePresence } from 'framer-motion';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './components/Footer.jsx';
import Navbar from './components/Navbar.jsx';
import PlantDetailsPage from './pages/PlantDetailsPage.jsx';
import HomePage from './pages/Homepage.jsx';

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/plant-details" element={<PlantDetailsPage />} />
        <Route path="*" element={<NotFound />} />
        <Route path='/footer' element ={<Footer></Footer>} ></Route>
      </Routes>
    </AnimatePresence>
  );
}

const NotFound = () => (
  <div className="text-center mt-20 text-red-600 font-semibold text-xl">
    🚫 Page Not Found
  </div>
);

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-lime-100 text-gray-800 font-sans">
        <Navbar />
        <main className="px-4 py-6">
          <AnimatedRoutes />
           <Footer /> 
        </main>
        <ToastContainer position="top-center" autoClose={3000} theme="colored" />
      </div>

    </Router>
  );
}

export default App;
