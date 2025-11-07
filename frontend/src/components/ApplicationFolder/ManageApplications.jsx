import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, getDocs, updateDoc, doc, query, where } from "firebase/firestore";
import { motion } from "framer-motion";

const ManageApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // Fetch only "Pending" applications
  const fetchApplications = async () => {
    try {
      const q = query(collection(db, "applications"), where("status", "==", "Pending"));
      const querySnapshot = await getDocs(q);
      const apps = [];

      querySnapshot.forEach((doc) => {
        apps.push({ id: doc.id, ...doc.data() });
      });

      setApplications(apps);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching applications:", error);
      setMessage("Failed to load applications.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleAction = async (appId, status) => {
    try {
      const appRef = doc(db, "applications", appId);

      // Update the status in Firestore
      await updateDoc(appRef, { status });

      // Remove from UI
      setApplications((prevApps) => prevApps.filter((app) => app.id !== appId));

      setMessage(`Application marked as ${status}.`);
    } catch (error) {
      console.error(`Error updating application:`, error);
      setMessage("Failed to update application.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto p-6 bg-gray-900 border border-gray-800 rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-bold text-white mb-4">Manage Applications</h2>
      {message && <p className="text-green-400">{message}</p>}

      {loading ? (
        <p className="text-gray-400">Loading applications...</p>
      ) : applications.length === 0 ? (
        <p className="text-gray-400">No pending applications.</p>
      ) : (
        <div className="space-y-4">
          {applications.map((app) => (
            <div
              key={app.id}
              className="p-4 bg-gray-800 border border-gray-700 rounded-lg"
            >
              <h3 className="text-lg font-semibold text-white">{app.type} Application</h3>
              <p className="text-gray-300"><strong>Applicant:</strong> {app.applicantName} ({app.applicantEmail})</p>
              <p className="text-gray-300"><strong>Description:</strong> {app.description}</p>
              <p className="text-gray-400"><strong>Priority:</strong> {app.priority === "1" ? "🔥 High" : app.priority === "2" ? "⚡ Medium" : "🌱 Low"}</p>
              <p className="text-gray-400"><strong>Status:</strong> {app.status || "Pending"}</p>

              <div className="mt-3 flex space-x-2">
                <button
                  onClick={() => handleAction(app.id, "Approved")}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleAction(app.id, "Rejected")}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default ManageApplications;
