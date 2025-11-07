import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const UpdateBudget = () => {
  const { id } = useParams(); // Get budget ID from URL
  const navigate = useNavigate();

  const [budget, setBudget] = useState({
    budgetName: "",
    amount: "",
    category: "",
    description: "",
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // Fetch budget details
  useEffect(() => {
    if (!id) {
      console.error("Budget ID is undefined");
      setMessage("Invalid budget ID.");
      setLoading(false);
      return;
    }
  
    const fetchBudget = async () => {
      try {
        console.log("Fetching budget with ID:", id);
        const budgetRef = doc(db, "budgets", id);
        const docSnap = await getDoc(budgetRef);
  
        if (docSnap.exists()) {
          setBudget(docSnap.data());
        } else {
          setMessage("Budget not found.");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching budget:", error);
        setMessage("Error loading budget.");
        setLoading(false);
      }
    };
  
    fetchBudget();
  }, [id]);
  
  // Handle input changes
  const handleChange = (e) => {
    setBudget({ ...budget, [e.target.name]: e.target.value });
  };

  // Update budget in Firestore
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const budgetRef = doc(db, "budgets", id);
      await updateDoc(budgetRef, budget);
      setMessage("Budget updated successfully!");
      setTimeout(() => navigate("/manage-budgets"), 1500); // Redirect after update
    } catch (error) {
      console.error("Error updating budget:", error);
      setMessage("Failed to update budget.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white border border-gray-300 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Update Budget</h2>

      {message && <p className="text-blue-500">{message}</p>}
      {loading ? (
        <p className="text-gray-500">Loading budget details...</p>
      ) : (
        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="block text-gray-700">Budget Name:</label>
            <input
              type="text"
              name="budgetName"
              value={budget.budgetName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">Amount:</label>
            <input
              type="number"
              name="amount"
              value={budget.amount}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">Category:</label>
            <input
              type="text"
              name="category"
              value={budget.category}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">Description:</label>
            <textarea
              name="description"
              value={budget.description}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
              rows="3"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg shadow"
          >
            Update Budget
          </button>
        </form>
      )}
    </div>
  );
};

export default UpdateBudget;
