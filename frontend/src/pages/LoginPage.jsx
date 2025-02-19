import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "student",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email, role) => {
    const patterns = {
      student: /^20\d{2}(bcs|mcs|bce|mech)\d{3}@sggs\.ac\.in$/i,
      faculty: /^[a-z]+\.[a-z]+@sggs\.ac\.in$/i,
      admin: /^admin\.[a-z]+@sggs\.ac\.in$/i,
      doctor: /^dr\.[a-z]+@sggs\.ac\.in$/i,
    };
    return patterns[role]?.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!validateEmail(formData.email, formData.role)) {
      setError(`Invalid ${formData.role} email format`);
      setIsLoading(false);
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      navigate(`/${formData.role}-dashboard`); // Corrected role-based navigation
    } catch (err) {
      setError("Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-blue-900 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl w-full max-w-md p-8 border border-white/20"
      >
        <h2 className="text-white text-2xl font-semibold text-center mb-6">
          Welcome Back! 👋
        </h2>

        {error && <p className="text-red-400 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Role Selection */}
          <div>
            <label className="block text-white/80">Role</label>
            <select
              value={formData.role}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
              className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-400"
            >
              <option value="student">Student</option>
              <option value="mtech">M.Tech Student</option>
              <option value="faculty">Faculty</option>
              <option value="admin">Admin</option>
              <option value="doctor">Doctor</option>
            </select>
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-white/80">Email</label>
            <div className="relative">
              <EnvelopeIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-white/50" />
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-400"
                placeholder="your.email@sggs.ac.in"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-white/80">Password</label>
            <div className="relative">
              <LockClosedIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-white/50" />
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-400"
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* Forgot Password & Login Button */}
          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={() => navigate("/forgot-password")}
              className="text-sm text-blue-400 hover:underline"
            >
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-lg bg-blue-500 text-white font-semibold transition-all hover:bg-blue-600 disabled:bg-gray-600"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Signup Link */}
        <p className="text-center text-white/60 mt-4">
          Don't have an account?{" "}
          <button
            onClick={() => navigate("/")}
            className="text-blue-400 hover:underline"
          >
            Sign Up
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPage;
