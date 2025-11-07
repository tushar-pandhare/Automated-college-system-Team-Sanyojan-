import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/signup"); // Navigate to the signup page
  };

  const handleLogin = () => {
    navigate("/login"); // Navigate to the login page
  };

  const handleSignup = () => {
    navigate("/signup"); // Navigate to the signup page
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex flex-col justify-center items-center text-gray-800 font-sans p-6 relative overflow-hidden">
      {/* Background Shape */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full opacity-50 transform rotate-45"></div>
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full opacity-50 transform rotate-12"></div>

      {/* Login and Signup Buttons */}
      <div className="absolute top-4 right-4 flex space-x-4">
        <button
          onClick={handleLogin}
          className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-all"
        >
          Login
        </button>
        <button
          onClick={handleSignup}
          className="px-4 py-2 bg-purple-600 text-white text-sm font-semibold rounded-lg hover:bg-purple-700 transition-all"
        >
          Signup
        </button>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* College Name */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 font-playfair text-gray-900 animate-fade-in">
          Shri Guru Gobind Singhji Institute of Engineering and Technology
        </h1>

        {/* Tagline */}
        <p className="text-lg sm:text-xl md:text-2xl mb-8 font-roboto text-gray-700 animate-fade-in delay-100">
          Vishnupuri, Nanded - Empowering Minds, Transforming Lives
        </p>

        {/* Get Started Button */}
        <button
          onClick={handleGetStarted}
          className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg animate-fade-in delay-200"
        >
          Get Started
        </button>
      </div>

      {/* Footer */}
      <div className="absolute bottom-4 text-sm text-gray-600 text-center font-roboto">
        <p>© All rights reserved by Team Sanyojan 2k25</p>
      </div>
    </div>
  );
};

export default LandingPage;