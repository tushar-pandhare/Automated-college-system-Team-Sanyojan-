import React, { useState } from "react";
import { addBudgetToFirestore } from "/src/firebase.jsx"; // Ensure this path is correct

const ApproveExpenses = () => {
  const [budgetName, setBudgetName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [proofUrls, setProofUrls] = useState([]);
  const [status, setStatus] = useState("pending");

  const handleFileChange = (event) => {
    setProofUrls([...event.target.files]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const budgetData = {
      budgetName,
      amount: parseFloat(amount),
      category,
      description,
      proofUrls,
      status,
    };

    const result = await addBudgetToFirestore(budgetData);
    if (result.success) {
      alert(result.message);
      // Reset the form after submission
      setBudgetName("");
      setAmount("");
      setCategory("");
      setDescription("");
      setProofUrls([]);
      setStatus("pending");
    } else {
      alert(`Error: ${result.message}`);
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 p-8 bg-white shadow-xl rounded-xl">
      <h2 className="text-3xl font-bold text-center text-blue-800 mb-8">Submit Budget Request</h2>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-6 mb-6">
          <div>
            <label htmlFor="budgetName" className="block font-semibold">Budget Name</label>
            <input
              id="budgetName"
              type="text"
              value={budgetName}
              onChange={(e) => setBudgetName(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label htmlFor="amount" className="block font-semibold">Amount (₹)</label>
            <input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label htmlFor="category" className="block font-semibold">Category</label>
            <input
              id="category"
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label htmlFor="description" className="block font-semibold">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>

          {/* <div>
            <label htmlFor="proofUrls" className="block font-semibold">Attachments</label>
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div> */}

          <div>
            <label htmlFor="status" className="block font-semibold">Status</label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md"
            >
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-md">Submit Budget</button>
      </form>
    </div>
  );
};

export default ApproveExpenses;
