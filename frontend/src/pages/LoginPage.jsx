// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { loginUser } from "../firebase";

// const LoginPage = () => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       await loginUser(email, password);
//       navigate("/HomePage"); // Redirect to Home Page
//     } catch (error) {
//       setError("Invalid email or password.");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
//         <h2 className="text-3xl font-semibold text-center text-green-600 mb-6">Login</h2>

//         {error && <p className="text-red-500 text-center">{error}</p>}

//         <form onSubmit={handleLogin} className="space-y-4">
//           <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
//             placeholder="Email" required className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-green-500" />
          
//           <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
//             placeholder="Password" required className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-green-500" />
          
//           <button type="submit" className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition">
//             Login
//           </button>
//         </form>

//         <p className="mt-4 text-center">
//           Don't have an account?{" "}
//           <button className="text-green-500 underline" onClick={() => navigate("/signup")}>
//             Sign Up
//           </button>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;


// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../firebase";


// const LoginPage = () => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("student");
//   const [error, setError] = useState("");

//   const validateEmail = (email, role) => {
//     const patterns = {
//       student: /^20\d{2}(bcs|mcs|bce|mech)\d{3}@sggs\.ac\.in$/i,
//       faculty: /^[a-z]+\.[a-z]+(@sggs\.ac\.in)$/i,
//       admin: /^admin\.[a-z]+(@sggs\.ac\.in)$/i,
//       doctor: /^dr\.[a-z]+(@sggs\.ac\.in)$/i
//     };
//     return patterns[role].test(email);
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     if (!validateEmail(email, role)) {
//       setError(`Invalid ${role} email format`);
//       return;
//     }

//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//       navigate(`/${role}-dashboard`);
//     } catch (error) {
//       setError("Authentication failed. Check credentials.");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
//         <h2 className="text-3xl font-semibold text-center text-green-600 mb-6">Login</h2>

//         {error && <p className="text-red-500 text-center">{error}</p>}

//         <form onSubmit={handleLogin} className="space-y-4">
//           <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-green-500">
//             <option value="student">Student</option>
//             <option value="mtech">M.Tech Student</option>
//             <option value="faculty">Faculty</option>
//             <option value="admin">Admin</option>
//             <option value="doctor">Doctor</option>
//           </select>

//           <input
//             type="email"
//             placeholder={`Email (${role === 'mtech' ? '2024mcs001' : '2024bcs001'}@sggs.ac.in)`}
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-green-500"
//           />

//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder="Password"
//             required
//             className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-green-500"
//           />

//           <button type="submit" className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition">
//             Login
//           </button>
//         </form>

//         <p className="mt-4 text-center">
//           Don't have an account?{" "}
//           <button className="text-green-500 underline" onClick={() => navigate("/signup")}>
//             Sign Up
//           </button>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;




import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LockClosedIcon, EnvelopeIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import { signInWithEmailAndPassword, signOut } from "firebase/auth"; // Import signOut
import { auth } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

const LoginPage = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    role: 'student' // Default role
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const roles = [
    { id: 'student', name: 'Student' },
    { id: 'faculty', name: 'Faculty' },
    { id: 'doctor', name: 'College Doctor' },
    { id: 'coordinator', name: 'Class Coordinator' },
    { id: 'authority', name: 'Designated Authority' },
    { id: 'board', name: 'Board Member' },
    { id: 'admin', name: 'System Admin' }
  ];

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
      const user = userCredential.user;

      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        if (userData.role === credentials.role) {
          navigate(`/${credentials.role}-dashboard`);
        } else {
          setError('Role mismatch. Please select the correct account type.');
          await signOut(auth); // Sign out on role mismatch
        }
      } else {
        setError('User data not found. Contact administrator.');
        await signOut(auth); // Sign out if user data not found
      }
    } catch (err) {
      setError(err.message); // Display Firebase error message
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
        <div className="mb-8">
          <UserGroupIcon className="mx-auto h-12 w-12 text-blue-400" />
          <h2 className="mt-4 text-center text-3xl font-bold text-white">
            College System Login
          </h2>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-4 p-3 bg-red-500/20 text-red-300 rounded-lg flex items-center"
          >
            ⚠️ {error}
          </motion.div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-white/80 mb-2">Account Type</label>
            <select
              value={credentials.role}
              onChange={(e) => setCredentials({ ...credentials, role: e.target.value })}
              className="w-full p-3 bg-white/5 border border-white/20 rounded-lg text-white"
            >
              {roles.map((role) => (
                <option key={role.id} value={role.id}>{role.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-white/80 mb-2">Email</label>
            <div className="relative">
              <EnvelopeIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-white/50" />
              <input
                type="email"
                value={credentials.email}
                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                required
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-white/80 mb-2">Password</label>
            <div className="relative">
              <LockClosedIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-white/50" />
              <input
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                required
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white"
              />
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading}
            className={`w-full ${
              isLoading ? 'bg-blue-600 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
            } text-white py-3 rounded-lg transition-all font-semibold flex items-center justify-center`}
          >
            {isLoading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Logging In...
              </div>
            ) : (
              'Sign In'
            )}
          </motion.button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => navigate('/parent-portal')}
            className="text-blue-300 hover:text-blue-400 underline"
          >
            Parent Portal Access
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;