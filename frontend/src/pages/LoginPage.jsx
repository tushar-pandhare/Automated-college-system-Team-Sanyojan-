import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../firebase";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await loginUser(email, password);
      navigate("/HomePage"); // Redirect to Home Page
    } catch (error) {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-semibold text-center text-green-600 mb-6">Login</h2>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-4">
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
            placeholder="Email" required className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-green-500" />
          
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
            placeholder="Password" required className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-green-500" />
          
          <button type="submit" className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition">
            Login
          </button>
        </form>

        <p className="mt-4 text-center">
          Don't have an account?{" "}
          <button className="text-green-500 underline" onClick={() => navigate("/signup")}>
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
