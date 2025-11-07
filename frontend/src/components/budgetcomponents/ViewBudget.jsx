import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import { motion } from "framer-motion";

const ViewBudgets = () => {
  const [archivedBudgets, setArchivedBudgets] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch archived budgets
  const fetchArchivedBudgets = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "archivedBudgets"));
      const budgetList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setArchivedBudgets(budgetList);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching budgets:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArchivedBudgets();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-5xl mx-auto p-6 bg-white border border-gray-300 rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Archived Budgets</h2>

      {loading ? (
        <p className="text-gray-500">Loading budgets...</p>
      ) : archivedBudgets.length === 0 ? (
        <p className="text-gray-500">No approved/rejected budgets found.</p>
      ) : (
        <div className="space-y-4">
          {archivedBudgets.map((budget) => (
            <div key={budget.id} className="p-4 bg-gray-100 border border-gray-400 rounded-xl shadow-md">
              <h3 className="text-lg font-semibold text-gray-900">{budget.budgetName}</h3>
              <p className="text-gray-700"><strong>Amount:</strong> ₹{budget.amount}</p>
              <p className="text-gray-700"><strong>Category:</strong> {budget.category}</p>
              <p className="text-gray-700"><strong>Description:</strong> {budget.description}</p>
              <p className="text-gray-600"><strong>Status:</strong> {budget.status}</p>
              <p className="text-gray-600"><strong>Reviewed At:</strong> {new Date(budget.reviewedAt.seconds * 1000).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default ViewBudgets;
