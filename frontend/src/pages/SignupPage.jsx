import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUpUser } from "../firebase";

const SignupPage = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signUpUser(fullName, email, password);
      navigate("/HomePage"); // Redirect to Home Page
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-semibold text-center text-blue-600 mb-6">Sign Up</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        
        <form onSubmit={handleSignup} className="space-y-4">
          <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)}
            placeholder="Full Name" required className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500" />
          
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
            placeholder="Email (YYYYbcsXXX@sggs.sc.in)" required className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500" />
          
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
            placeholder="Password" required className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500" />
          
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
            Sign Up
          </button>
        </form>

        <p className="mt-4 text-center">
          Already have an account?{" "}
          <button className="text-blue-500 underline" onClick={() => navigate("/")}>
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
