// 1


// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { signUpUser } from "../firebase";

// const SignupPage = () => {
//   const navigate = useNavigate();
//   const [fullName, setFullName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       await signUpUser(fullName, email, password);
//       navigate("/HomePage"); // Redirect to Home Page
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
//         <h2 className="text-3xl font-semibold text-center text-blue-600 mb-6">Sign Up</h2>
//         {error && <p className="text-red-500 text-center">{error}</p>}
        
//         <form onSubmit={handleSignup} className="space-y-4">
//           <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)}
//             placeholder="Full Name" required className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500" />
          
//           <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
//             placeholder="Email (YYYYbcsXXX@sggs.sc.in)" required className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500" />
          
//           <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
//             placeholder="Password" required className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500" />
          
//           <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
//             Sign Up
//           </button>
//         </form>

//         <p className="mt-4 text-center">
//           Already have an account?{" "}
//           <button className="text-blue-500 underline" onClick={() => navigate("/")}>
//             Login
//           </button>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default SignupPage;

//2

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { LockClosedIcon, UserIcon, AcademicCapIcon, EnvelopeIcon } from "@heroicons/react/24/outline";
// import { signUpUser } from "../firebase";

// const SignupPage = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     password: "",
//     role: "student"
//   });
//   const [error, setError] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [passwordStrength, setPasswordStrength] = useState(0);

//   const roles = [
//     { id: "student", name: "Student", icon: "🎓" },
//     { id: "mtech", name: "M.Tech", icon: "📚" },
//     { id: "faculty", name: "Faculty", icon: "👩🏫" },
//     { id: "admin", name: "Admin", icon: "🔑" },
//   ];

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setIsLoading(true);

//     try {
//       await signUpUser(formData);
//       navigate("/verify-email");
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const checkPasswordStrength = (password) => {
//     let strength = 0;
//     if (password.length >= 8) strength++;
//     if (password.match(/[A-Z]/)) strength++;
//     if (password.match(/[0-9]/)) strength++;
//     if (password.match(/[^A-Za-z0-9]/)) strength++;
//     setPasswordStrength(strength);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center p-4">
//       <motion.div 
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl w-full max-w-md p-8 border border-white/20"
//       >
//         <div className="text-center mb-8">
//           <h1 className="text-4xl font-bold text-white mb-2">Create Account</h1>
//           <p className="text-white/80">Join our academic community</p>
//         </div>

//         {error && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="mb-4 p-3 bg-red-500/20 text-red-300 rounded-lg flex items-center"
//           >
//             ⚠️ {error}
//           </motion.div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* Role Selection */}
//           <div className="grid grid-cols-2 gap-3">
//             {roles.map((role) => (
//               <button
//                 key={role.id}
//                 type="button"
//                 onClick={() => setFormData({...formData, role: role.id})}
//                 className={`p-3 rounded-xl transition-all ${
//                   formData.role === role.id
//                     ? 'bg-blue-500 text-white'
//                     : 'bg-white/10 hover:bg-white/20 text-white/80'
//                 }`}
//               >
//                 <div className="flex flex-col items-center">
//                   <span className="text-2xl mb-1">{role.icon}</span>
//                   <span className="text-sm">{role.name}</span>
//                 </div>
//               </button>
//             ))}
//           </div>

//           {/* Full Name */}
//           <div className="space-y-1">
//             <label className="block text-white/80">Full Name</label>
//             <div className="relative">
//               <UserIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-white/50" />
//               <input
//                 type="text"
//                 value={formData.fullName}
//                 onChange={(e) => setFormData({...formData, fullName: e.target.value})}
//                 placeholder="John Doe"
//                 required
//                 className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-blue-400"
//               />
//             </div>
//           </div>

//           {/* Email */}
//           <div className="space-y-1">
//             <label className="block text-white/80">Institutional Email</label>
//             <div className="relative">
//               <EnvelopeIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-white/50" />
//               <input
//                 type="email"
//                 value={formData.email}
//                 onChange={(e) => setFormData({...formData, email: e.target.value})}
//                 placeholder={
//                   formData.role === 'mtech' 
//                     ? "2024mcs001@sggs.ac.in" 
//                     : "2024bcs001@sggs.ac.in"
//                 }
//                 required
//                 className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-blue-400"
//               />
//             </div>
//           </div>

//           {/* Password */}
//           <div className="space-y-1">
//             <label className="block text-white/80">Password</label>
//             <div className="relative">
//               <LockClosedIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-white/50" />
//               <input
//                 type="password"
//                 value={formData.password}
//                 onChange={(e) => {
//                   setFormData({...formData, password: e.target.value});
//                   checkPasswordStrength(e.target.value);
//                 }}
//                 placeholder="••••••••"
//                 required
//                 className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-blue-400"
//               />
//             </div>
//             <div className="flex gap-1 mt-2">
//               {[...Array(4)].map((_, i) => (
//                 <div
//                   key={i}
//                   className={`h-1 w-full rounded-full transition-colors ${
//                     passwordStrength > i ? 'bg-blue-400' : 'bg-white/20'
//                   }`}
//                 />
//               ))}
//             </div>
//           </div>

//           {/* Submit Button */}
//           <motion.button
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//             type="submit"
//             disabled={isLoading}
//             className={`w-full ${
//               isLoading ? 'bg-blue-600 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
//             } text-white py-3 rounded-lg transition-all font-semibold flex items-center justify-center`}
//           >
//             {isLoading ? (
//               <div className="flex items-center">
//                 <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
//                 Creating Account...
//               </div>
//             ) : (
//               'Get Started'
//             )}
//           </motion.button>
//         </form>

//         <p className="mt-6 text-center text-white/80">
//           Already have an account?{' '}
//           <button
//             onClick={() => navigate("/login")}
//             className="text-blue-300 hover:text-blue-400 underline transition-colors"
//           >
//             Sign In
//           </button>
//         </p>
//       </motion.div>
//     </div>
//   );
// };

// export default SignupPage;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LockClosedIcon, UserIcon, EnvelopeIcon, IdentificationIcon } from '@heroicons/react/24/outline';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, collection } from "firebase/firestore";
import { auth, db } from "../firebase";

const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    role: 'student',
    studentId: '', // Add for student role
    facultyId: '', // Add for faculty role
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const roles = [
    { id: 'student', name: 'Student', icon: '🎓' },
    { id: 'faculty', name: 'Faculty', icon: '👩🏫' },
    { id: 'doctor', name: 'College Doctor', icon: '🩺' },
    { id: 'coordinator', name: 'Class Coordinator', icon: '📋' },
    { id: 'authority', name: 'Designated Authority', icon: '⚖️' },
    { id: 'board', name: 'Board Member', icon: '👥' },
    { id: 'admin', name: 'System Admin', icon: '🔐' }
  ];

  const validateEmail = (email, role) => {
    const patterns = {
      student: /^20\d{2}[a-z]{3}\d{3}@sggs\.ac\.in$/i,
      faculty: /^[a-z]+\.[a-z]+@sggs\.ac\.in$/i,
      doctor: /^dr\.[a-z]+@sggs\.ac\.in$/i,
      coordinator: /^coord\.[a-z]+@sggs\.ac\.in$/i,
      authority: /^auth\.[a-z]+@sggs\.ac\.in$/i,
      board: /^board\.[a-z]+@sggs\.ac\.in$/i,
      admin: /^admin\.[a-z]+@sggs\.ac\.in$/i
    };
    return patterns[role] && patterns[role].test(email); // Check if pattern exists
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
    setError('');
    setIsLoading(true);

    try {
      if (!validateEmail(formData.email, formData.role)) {
        throw new Error(`Invalid email format for ${formData.role}`);
      }

      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;

      const usersCollectionRef = collection(db, 'users');
      const userDocRef = doc(usersCollectionRef, user.uid);

      const userData = {
        uid: user.uid,
        fullName: formData.fullName,
        email: formData.email,
        role: formData.role,
      };

      if (formData.role === 'student') {
        userData.studentId = formData.studentId;
      } else if (formData.role === 'faculty') {
        userData.facultyId = formData.facultyId;
      }

      await setDoc(userDocRef, userData);

      navigate('/verify-email');
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
        {/* ... (rest of the JSX - header, error display) */}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Role Selection Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
            {roles.map((role) => (
              <button
                key={role.id}
                type="button"
                onClick={() => setFormData({ ...formData, role: role.id })}
                className={`p-3 rounded-xl transition-all ${
                  formData.role === role.id
                    ? 'bg-blue-500 text-white'
                    : 'bg-white/10 hover:bg-white/20 text-white/80'
                }`}
              >
                <div className="flex flex-col items-center">
                  <span className="text-2xl mb-1">{role.icon}</span>
                  <span className="text-sm">{role.name}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Dynamic Form Fields */}
          {['student', 'faculty'].includes(formData.role) && (
            <div className="mb-4">
              <label className="block text-white/80 mb-2">
                {formData.role === 'student' ? 'Student ID' : 'Faculty ID'}
              </label>
              <div className="relative">
                <IdentificationIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-white/50" />
                <input
                  type="text"
                  required
                  value={formData[formData.role === 'student' ? 'studentId' : 'facultyId']}
                  onChange={(e) => setFormData({ ...formData, [formData.role === 'student' ? 'studentId' : 'facultyId']: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white"
                />
              </div>
            </div>
          )}

          {/* Common Fields */}
          {/* ... (full name, email, password fields - same as before) */}
          <div className="space-y-1">
            <label className="block text-white/80">Password</label>
            <div className="relative">
              <LockClosedIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-white/50" />
              <input
                type="password"
                value={formData.password}
                onChange={(e) => {
                  setFormData({ ...formData, password: e.target.value });
                  checkPasswordStrength(e.target.value);
                }}
                placeholder="••••••••"
                required
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-blue-400"
              />
            </div>
            <div className="flex gap-1 mt-2">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className={`h-1 w-full rounded-full transition-colors ${
                    passwordStrength > i ? 'bg-blue-400' : 'bg-white/20'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Submit Button */}
          {/* ... (submit button - same as before) */}

        </form>

        {/* ... (sign in link - same as before) */}

      </motion.div>
    </div>
  );
};

export default SignupPage;