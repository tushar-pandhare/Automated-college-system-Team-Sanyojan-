import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 relative overflow-hidden">
      {/* Background Animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 bg-[url('/path/to/your/background-image.jpg')] bg-cover bg-center opacity-20"
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-6xl font-bold text-white mb-8"
        >
          Welcome to SGGS Portal
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl text-white/80 mb-12"
        >
          Your gateway to academic and administrative services
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col space-y-6 w-full max-w-sm"
        >
          {/* Login Button */}
          <button
            onClick={() => navigate("/login")}
            className="w-full py-3 rounded-lg bg-blue-500/90 text-white font-semibold hover:bg-blue-600/90 transition-all transform hover:scale-105"
          >
            Login
          </button>

          {/* Signup Button */}
          <button
            onClick={() => navigate("/signup")}
            className="w-full py-3 rounded-lg bg-green-500/90 text-white font-semibold hover:bg-green-600/90 transition-all transform hover:scale-105"
          >
            Sign Up
          </button>

          {/* Parent Portal Button */}
          <button
            onClick={() => navigate("/parent-portal")}
            className="w-full py-3 rounded-lg bg-purple-500/90 text-white font-semibold hover:bg-purple-600/90 transition-all transform hover:scale-105"
          >
            Parent Portal
          </button>
        </motion.div>
      </div>

      {/* Floating Particles Animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute inset-0 overflow-hidden"
      >
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: 0, x: Math.random() * 100 - 50 }}
            animate={{
              y: [0, Math.random() * 100 - 50, 0],
              x: [Math.random() * 100 - 50, Math.random() * 100 - 50, Math.random() * 100 - 50],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear",
            }}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default LandingPage;