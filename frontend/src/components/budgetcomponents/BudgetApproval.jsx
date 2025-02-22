import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, getDocs, deleteDoc, doc, setDoc } from "firebase/firestore";
import { motion } from "framer-motion";

const ManageBudgets = () => {
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // Fetch budgets from Firestore
  const fetchBudgets = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "budgets"));
      const budgetList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBudgets(budgetList);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching budgets:", error);
      setMessage("Failed to load budgets.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBudgets();
  }, []);

  // Handle status change
  const handleStatusChange = async (budget, status) => {
    try {
      const budgetRef = doc(db, "budgets", budget.id);
      const archivedBudgetRef = doc(db, "archivedBudgets", budget.id);

      // Move budget to "archivedBudgets" collection
      await setDoc(archivedBudgetRef, {
        ...budget,
        status,
        reviewedAt: new Date(),
      });

      // Delete from "budgets" collection
      await deleteDoc(budgetRef);

      // Remove from local state
      setBudgets((prevBudgets) => prevBudgets.filter((b) => b.id !== budget.id));

      setMessage(`Budget ${status} and moved to archive.`);
    } catch (error) {
      console.error("Error updating budget:", error);
      setMessage("Failed to update budget.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-5xl mx-auto p-6 bg-white border border-gray-300 rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Manage Budgets</h2>
      {message && <p className="text-green-500">{message}</p>}

      {loading ? (
        <p className="text-gray-500">Loading budgets...</p>
      ) : budgets.length === 0 ? (
        <p className="text-gray-500">No pending budgets.</p>
      ) : (
        <div className="space-y-4">
          {budgets.map((budget) => (
            <div key={budget.id} className="p-4 bg-gray-100 border border-gray-400 rounded-xl shadow-md">
              <h3 className="text-lg font-semibold text-gray-900">{budget.budgetName}</h3>
              <p className="text-gray-700"><strong>Amount:</strong> ₹{budget.amount}</p>
              <p className="text-gray-700"><strong>Category:</strong> {budget.category}</p>
              <p className="text-gray-700"><strong>Description:</strong> {budget.description}</p>
              <p className="text-gray-600"><strong>Status:</strong> {budget.status || "Pending"}</p>

              <div className="mt-3 flex space-x-2">
                <button
                  onClick={() => handleStatusChange(budget, "Approved")}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleStatusChange(budget, "Rejected")}
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

export default ManageBudgets;
