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
    adminUsername: "",
    adminPassword: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email, role) => {
    const patterns = {
      student: /^20\d{2}(bcs|mcs|bce|mech)\d{3}@sggs\.ac\.in$/i,
      mtech: /^20\d{2}mtech\d{3}@sggs\.ac\.in$/i,
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

    try {
      if (formData.role === "admin") {
        // 🔹 Replace with secure admin authentication
        if (
          formData.adminUsername === "admin" &&
          formData.adminPassword === "admin123"
        ) {
          navigate("/admin-dashboard");
          return;
        } else {
          throw new Error("Invalid Admin credentials");
        }
      }

      if (!validateEmail(formData.email, formData.role)) {
        throw new Error(`Invalid ${formData.role} email format`);
      }

      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      navigate(`/${formData.role}-dashboard`);
    } catch (err) {
      setError(err.message);
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
          {/* Role Selection - Radio Button Group */}
          <div>
            <label className="block text-white/80 mb-2">Role</label>
            <div className="flex flex-wrap gap-3">
              {[
                { id: "student", name: "Student" },
                { id: "mtech", name: "M.Tech" },
                { id: "faculty", name: "Faculty" },
                { id: "admin", name: "Admin" },
                { id: "doctor", name: "Doctor" },
              ].map((role) => (
                <label
                  key={role.id}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer transition-all ${
                    formData.role === role.id
                      ? "bg-blue-500 text-white"
                      : "bg-white/10 text-white/80 hover:bg-white/20"
                  }`}
                >
                  <input
                    type="radio"
                    name="role"
                    value={role.id}
                    checked={formData.role === role.id}
                    onChange={() =>
                      setFormData({ ...formData, role: role.id })
                    }
                    className="hidden"
                  />
                  <span>{role.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Conditional Fields */}
          {formData.role === "admin" ? (
            <>
              {/* Admin Username */}
              <div>
                <label className="block text-white/80">Admin Username</label>
                <div className="relative">
                  <EnvelopeIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-white/50" />
                  <input
                    type="text"
                    required
                    value={formData.adminUsername}
                    onChange={(e) =>
                      setFormData({ ...formData, adminUsername: e.target.value })
                    }
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-400"
                    placeholder="Enter admin username"
                  />
                </div>
              </div>

              {/* Admin Password */}
              <div>
                <label className="block text-white/80">Admin Password</label>
                <div className="relative">
                  <LockClosedIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-white/50" />
                  <input
                    type="password"
                    required
                    value={formData.adminPassword}
                    onChange={(e) =>
                      setFormData({ ...formData, adminPassword: e.target.value })
                    }
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-400"
                    placeholder="Enter admin password"
                  />
                </div>
              </div>
            </>
          ) : (
            <>
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
            </>
          )}

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
            onClick={() => navigate("/signup")}
            className="text-blue-400 hover:underline"
          >
            Sign Up
          </button>
        </p>
        <p className="text-center text-white/60 mt-4">
          <br />
          Click for :{" "}
          <button
            onClick={() => navigate("/parent-portal")}
            className="text-blue-400 hover:underline"
          >
            Parent Portal
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPage;