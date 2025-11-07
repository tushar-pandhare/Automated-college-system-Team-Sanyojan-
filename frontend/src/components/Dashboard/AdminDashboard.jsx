import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { db, collection, getDocs, updateDoc, doc } from "../../firebase2"; // Correct import path

const AdminDashboard = () => {
  const [elections, setElections] = useState([]);
  const [candidates, setCandidates] = useState([]);

  // Fetch elections and candidates from Firestore
  useEffect(() => {
    const fetchData = async () => {
      const electionsRef = collection(db, "elections");
      const electionsSnapshot = await getDocs(electionsRef);
      setElections(electionsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));

      const candidatesRef = collection(db, "candidates");
      const candidatesSnapshot = await getDocs(candidatesRef);
      setCandidates(candidatesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchData();
  }, []);

  // Approve a candidate
  const handleApproveCandidate = async (candidateId) => {
    try {
      const candidateRef = doc(db, "candidates", candidateId);
      await updateDoc(candidateRef, { status: "approved" });
      alert("Candidate approved!");
      setCandidates(candidates.map(candidate =>
        candidate.id === candidateId ? { ...candidate, status: "approved" } : candidate
      ));
    } catch (error) {
      alert(`Failed to approve candidate: ${error.message}`);
    }
  };

  const sections = [
    { title: "Manage Elections", description: "View, create, and manage student elections.", icon: "🗳", link: "/admin/election" },
    { title: "Manage Complaints", description: "Review and resolve student complaints.", icon: "💬", link: "/admin/complaints" },
    { title: "Manage Budgets", description: "Track budgets and verify expenses.", icon: "💰", link: "/admin/budgets" },
    { title: "Manage Notifications", description: "Send and monitor campus notifications.", icon: "📢", link: "/admin/notifications" },
    { title: "Manage Bookings", description: "Approve or cancel facility bookings.", icon: "🏢", link: "/admin/bookings" },
    { title: "Manage Applications", description: "Review and approve requests and applications.", icon: "📄", link: "/admin/applications" },
  ];

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { delayChildren: 0.2, staggerChildren: 0.1 } },
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* HEADER */}
      <header className="bg-gradient-to-r from-blue-900 via-teal-700 to-blue-600 text-white py-3 px-6 shadow-md">
        <h1 className="text-xl font-semibold">Admin Dashboard</h1>
      </header>

      <div className="flex flex-1">
        {/* SIDEBAR */}
        <aside className="w-60 bg-gray-900 text-white p-4 hidden md:block">
          <nav>
            <ul className="space-y-3">
              {sections.map((section, index) => (
                <li key={index}>
                  <motion.div whileHover={{ scale: 1.05 }} className="px-3 py-2 rounded hover:bg-gray-700 transition">
                    <Link to={section.link}>{section.title}</Link>
                  </motion.div>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 p-6">
          {/* Existing Sections */}
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" initial="hidden" animate="visible" variants={containerVariants}>
            {sections.map((section, index) => (
              <motion.div
                key={index}
                className="bg-white p-5 rounded-lg shadow-md transform transition hover:scale-105 hover:bg-gray-100"
                whileHover={{ y: -5 }}
              >
                <div className="text-4xl">{section.icon}</div>
                <h2 className="mt-3 text-xl font-bold text-gray-800">{section.title}</h2>
                <p className="mt-2 text-gray-600">{section.description}</p>
                <Link to={section.link} className="mt-4 inline-block text-teal-600 hover:text-teal-800 transition font-medium">
                  Manage &rarr;
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* Election Management Section */}
          <section className="mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Elections</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {elections.map(election => (
                <motion.div
                  key={election.id}
                  className="bg-white p-5 rounded-lg shadow-md transform transition hover:scale-105 hover:bg-gray-100"
                  whileHover={{ y: -5 }}
                >
                  <div className="text-4xl">🗳</div>
                  <h2 className="mt-3 text-xl font-bold text-gray-800">{election.title}</h2>
                  <p className="mt-2 text-gray-600">Status: {election.status}</p>
                  <Link to={`/admin/elections/${election.id}`} className="mt-4 inline-block text-teal-600 hover:text-teal-800 transition font-medium">
                    Manage &rarr;
                  </Link>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Candidate Approval Section */}
          <section className="mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Candidate Applications</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {candidates.map(candidate => (
                <motion.div
                  key={candidate.id}
                  className="bg-white p-5 rounded-lg shadow-md transform transition hover:scale-105 hover:bg-gray-100"
                  whileHover={{ y: -5 }}
                >
                  <div className="text-4xl">👤</div>
                  <h2 className="mt-3 text-xl font-bold text-gray-800">{candidate.name}</h2>
                  <p className="mt-2 text-gray-600">{candidate.bio}</p>
                  <p className="mt-2 text-gray-600">Status: {candidate.status}</p>
                  {candidate.status === "pending" && (
                    <button
                      onClick={() => handleApproveCandidate(candidate.id)}
                      className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
                    >
                      Approve
                    </button>
                  )}
                </motion.div>
              ))}
            </div>
          </section>
        </main>
      </div>

      {/* FOOTER (STICKY TO BOTTOM) */}
      <footer className="bg-gray-900 text-gray-300 text-center py-3 mt-auto">
        &copy; {new Date().getFullYear()} Automated College System. All rights reserved.
      </footer>
    </div>
  );
};

export default AdminDashboard;