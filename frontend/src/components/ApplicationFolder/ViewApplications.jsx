import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import { motion } from "framer-motion";

const ViewApplications = () => {
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [filter, setFilter] = useState("All");

  // Fetch applications from Firestore
  const fetchApplications = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "applications"));
      const apps = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        apps.push({
          id: doc.id,
          ...data,
          status: data.status ? data.status.charAt(0).toUpperCase() + data.status.slice(1).toLowerCase() : "Pending",
        });
      });
      setApplications(apps);
      setFilteredApplications(apps);
      setLoading(false);
      console.log("Fetched Applications:", apps); // Debugging
    } catch (error) {
      console.error("Error fetching applications:", error);
      setErrorMessage("Failed to load applications. Please try again later.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  // Filter applications based on selected status
  useEffect(() => {
    if (filter === "All") {
      setFilteredApplications(applications);
    } else {
      setFilteredApplications(applications.filter((app) => app.status === filter));
    }
  }, [filter, applications]);

  const getStatusColor = (status) => {
    switch (status) {
      case "Approved":
        return "text-green-400";
      case "Rejected":
        return "text-red-400";
      default:
        return "text-yellow-400";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto p-6 bg-gray-900 border border-gray-800 rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-bold text-white mb-6">View Applications</h2>

      {/* Error Message */}
      {errorMessage && <p className="text-red-400 mb-4">{errorMessage}</p>}

      {/* Filter Buttons */}
      <div className="flex space-x-4 mb-6">
        {["All", "Pending", "Approved", "Rejected"].map((status) => (
          <button
            key={status}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              filter === status
                ? "bg-blue-500 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
            onClick={() => setFilter(status)}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Loading State */}
      {loading ? (
        <p className="text-gray-400">Loading applications...</p>
      ) : filteredApplications.length === 0 ? (
        <p className="text-gray-400">No applications found.</p>
      ) : (
        <div className="space-y-6">
          {filteredApplications.map((app) => (
            <div
              key={app.id}
              className="p-5 bg-gray-800 border border-gray-700 rounded-lg hover:border-gray-600 transition-colors"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {app.type} Application
                  </h3>
                  <p className="text-gray-300">
                    <span className="font-medium">Applicant:</span> {app.applicantName}
                  </p>
                  <p className="text-gray-300">
                    <span className="font-medium">Email:</span> {app.applicantEmail}
                  </p>
                </div>

                <div>
                  <p className="text-gray-300">
                    <span className="font-medium">Priority:</span>{" "}
                    {app.priority === 1 ? "High" : app.priority === 2 ? "Medium" : "Low"}
                  </p>
                  <p className="text-gray-300">
                    <span className="font-medium">Submitted:</span>{" "}
                    {app.timestamp?.toDate().toLocaleDateString()}
                  </p>
                  <p className={`${getStatusColor(app.status)} font-medium`}>
                    Status: {app.status || "Pending"}
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-700">
                <p className="text-gray-300">
                  <span className="font-medium">Description:</span> {app.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default ViewApplications;
