import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, collection } from "firebase/firestore";
import { auth, db } from "../firebase";

const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "student",
    studentId: "",
    facultyId: "",
    department: "",
    contactNumber: "",
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const validateEmail = (email, role) => {
    const patterns = {
      student: /^20\d{2}[a-z]{3}\d{3}@sggs\.ac\.in$/i,
      faculty: /^[a-z]+\.[a-z]+@sggs\.ac\.in$/i,
      doctor: /^dr\.[a-z]+@sggs\.ac\.in$/i,
      coordinator: /^coord\.[a-z]+@sggs\.ac\.in$/i,
      authority: /^auth\.[a-z]+@sggs\.ac\.in$/i,
      board: /^board\.[a-z]+@sggs\.ac\.in$/i,
      admin: /^admin\.[a-z]+@sggs\.ac\.in$/i,
    };
    return patterns[role] && patterns[role].test(email);
  };

  const checkPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.match(/[A-Z]/)) strength++;
    if (password.match(/[0-9]/)) strength++;
    if (password.match(/[^A-Za-z0-9]/)) strength++;
    setPasswordStrength(strength);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
  
    try {
      if (!validateEmail(formData.email, formData.role)) {
        throw new Error(`Invalid email format for ${formData.role}`);
      }
  
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;
  
      const userData = {
        uid: user.uid,
        fullName: formData.fullName,
        email: formData.email,
        role: formData.role,
        contactNumber: formData.contactNumber,
      };
  
      if (formData.role === "student") {
        userData.studentId = formData.studentId;
        userData.department = formData.department;
      } else if (formData.role === "faculty") {
        userData.facultyId = formData.facultyId;
        userData.department = formData.department;
      }
  
      await setDoc(doc(collection(db, "users"), user.uid), userData);
  
      // Redirect based on role
      navigate(`/${formData.role}-dashboard`);
  
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl w-full max-w-md p-8 border border-white/20"
      >
        <h1 className="text-4xl font-bold text-white mb-4 text-center">Sign Up</h1>

        {error && <div className="mb-4 p-3 bg-red-500/20 text-red-300 rounded-lg">⚠️ {error}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div>
            <label className="block text-white/80">Full Name</label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              required
              className="w-full p-3 bg-white/5 border border-white/20 rounded-lg text-white"
            />
          </div>

          {/* College Email */}
          <div>
            <label className="block text-white/80">College Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="w-full p-3 bg-white/5 border border-white/20 rounded-lg text-white"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-white/80">Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => {
                setFormData({ ...formData, password: e.target.value });
                checkPasswordStrength(e.target.value);
              }}
              required
              className="w-full p-3 bg-white/5 border border-white/20 rounded-lg text-white"
            />
            <div className="mt-1 text-xs text-gray-300">
              Strength:{" "}
              <span
                className={
                  passwordStrength < 2
                    ? "text-red-400"
                    : passwordStrength < 3
                    ? "text-yellow-400"
                    : "text-green-400"
                }
              >
                {["Weak", "Moderate", "Strong", "Very Strong"][passwordStrength]}
              </span>
            </div>
          </div>

          {/* Role Selection */}
          <div className="flex flex-wrap gap-3">
            {[
              { id: "student", name: "Student" },
              { id: "faculty", name: "Faculty" },
              { id: "doctor", name: "Doctor" },
            ].map((role) => (
              <label
                key={role.id}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer text-sm transition-all ${
                  formData.role === role.id
                    ? "bg-blue-500 text-white"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
              >
                <input
                  type="radio"
                  name="role"
                  value={role.id}
                  checked={formData.role === role.id}
                  onChange={() => setFormData({ ...formData, role: role.id })}
                  className="hidden"
                />
                <span>{role.name}</span>
              </label>
            ))}
          </div>

          {/* Submit Button */}
          <button type="submit" className="w-full bg-blue-500 text-white py-3 rounded-lg">
            {isLoading ? "Signing up..." : "Sign Up"}
          </button>

        </form>
        <div>
        <p className="text-center text-white/60 mt-4">
        Already have an account?{" "}
        <button onClick={() => navigate("/login")} className="text-blue-400 hover:underline">
          Login
        </button>
      </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SignupPage;
