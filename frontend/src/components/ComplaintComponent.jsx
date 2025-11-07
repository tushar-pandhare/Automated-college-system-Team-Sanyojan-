import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  auth, 
  submitComplaint, 
  fetchApprovedComplaints, 
  fetchComplaints, 
  approveComplaint, 
  rejectComplaint 
} from "../firebase2"; 
import { onAuthStateChanged } from "firebase/auth";
import { logout } from "../firebase2"; // Import logout function

const handleLogout = async () => {
  await logout();
  window.location.href = "/login"; // Redirect after logout
};

const ComplaintPage = () => {
  // Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [submissionMessage, setSubmissionMessage] = useState("");
  const [userId, setUserId] = useState(null);

  // Complaints state
  const [complaints, setComplaints] = useState([]);
  const [pendingComplaints, setPendingComplaints] = useState([]);

  // Admin toggle
  const [isAdmin, setIsAdmin] = useState(false);

  // Fetch user authentication status
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
    });
  }, []);

  // Fetch approved complaints from Firebase
  useEffect(() => {
    fetchApprovedComplaints()
      .then((data) => setComplaints(data))
      .catch((err) => console.error("Error fetching approved complaints:", err));
  }, []);

  // Fetch pending complaints (Admin only)
  useEffect(() => {
    if (isAdmin) {
      fetchComplaints("pending")
        .then((data) => setPendingComplaints(data))
        .catch((err) => console.error("Error fetching pending complaints:", err));
    }
  }, [isAdmin]);

  // Handle complaint submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;
    if (!userId) {
      setSubmissionMessage("You must be logged in to submit a complaint.");
      return;
    }

    const newComplaint = { title, description, isAnonymous, userId };

    submitComplaint(newComplaint)
      .then(() => {
        setSubmissionMessage("Complaint submitted successfully!");
        setTitle("");
        setDescription("");
        setIsAnonymous(true);
      })
      .catch((err) => {
        console.error("Submission error:", err);
        setSubmissionMessage("Error submitting complaint.");
      });
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <nav className="bg-gradient-to-r from-blue-800 to-blue-900 p-4 text-white shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Team Sanyojan - Complaints</h1>
        </div>
      </nav>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-gradient-to-b from-blue-700 to-blue-900 text-white p-6 flex flex-col">
          <h2 className="text-xl font-semibold mb-6 text-center">Menu</h2>
          <nav>
            <ul className="space-y-3">
              <li>
                <a href="/signup" className="flex items-center px-4 py-2 rounded-md hover:bg-blue-600 transition">
                  Home
                </a>
              </li>
              <li>
                <a href="/complaints" className="flex items-center px-4 py-2 rounded-md hover:bg-blue-600 transition">
                  Complaints
                </a>
              </li>
            </ul>
          </nav>
          
          <button 
    onClick={handleLogout} 
    className="py-2 text-center mt-100  text-red-400 hover:text-red-600 font-semibold transition"
  >
    Logout
  </button>

        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-gray-100 p-10">
          {/* Complaint Submission Form */}
          <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-3xl font-bold text-gray-800 mb-4">
            Submit a Complaint
          </motion.h1>
          <motion.form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition space-y-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter complaint title"
              className="w-full p-3 border border-gray-300 rounded-md"
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter complaint description"
              rows="5"
              className="w-full p-3 border border-gray-300 rounded-md"
            ></textarea>
            <div className="flex items-center">
              <label className="mr-2 text-gray-700 font-semibold">Submit Anonymously?</label>
              <select
                value={isAnonymous ? "yes" : "no"}
                onChange={(e) => setIsAnonymous(e.target.value === "yes")}
                className="p-2 border border-gray-300 rounded-md"
              >
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            <motion.button type="submit" className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Submit Complaint
            </motion.button>
            {submissionMessage && <div className="mt-4 text-center text-green-600">{submissionMessage}</div>}
          </motion.form>


          {/* Approved Complaints */}
          <h2 className="text-2xl font-bold text-gray-800 mt-10 mb-4">Approved Complaints</h2>
          {complaints.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {complaints.map((complaint) => (
                <div key={complaint.id} className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold text-gray-800">{complaint.complaintText.title}</h3>
                  <p className="text-gray-600 mt-2">{complaint.complaintText.description}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No approved complaints available.</p>
          )}
        </main>
      </div>
    </div>
  );
};

export default ComplaintPage;