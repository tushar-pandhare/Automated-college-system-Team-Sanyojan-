import { useEffect, useState } from "react";
import { getStudentLeaveHistory } from "/src/firebase3"; // ✅ Correct import path

const LeaveHistory = () => {
  const [studentEmail, setStudentEmail] = useState("");
  const [leaveHistory, setLeaveHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const fetchLeaveHistory = async () => {
    if (!studentEmail.trim()) {
      setError("❌ Student email is required.");
      return;
    }

    setLoading(true);
    setError(null);
    setSubmitted(true);

    try {
      const history = await getStudentLeaveHistory(studentEmail);
      setLeaveHistory(history);
    } catch (err) {
      console.error("❌ Error fetching leave history:", err);
      setError("Failed to load leave history.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold text-center mb-4 text-blue-800">My Leave History</h2>

      {/* Email Input */}
      <div className="flex flex-col items-center gap-3 mb-4">
        <input
          type="email"
          placeholder="Enter your student email"
          value={studentEmail}
          onChange={(e) => setStudentEmail(e.target.value)}
          className="p-2 border rounded w-full max-w-md"
        />
        <button
          onClick={fetchLeaveHistory}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Submit
        </button>
      </div>

      {/* Error Message */}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Loading Indicator */}
      {loading && <p className="text-center text-gray-500">Loading...</p>}

      {/* Leave History */}
      {!loading && submitted && leaveHistory.length === 0 ? (
        <p className="text-center text-gray-500">No leave history found.</p>
      ) : (
        <ul className="space-y-2">
          {leaveHistory.map((leave) => (
            <li key={leave.id} className="p-3 border rounded-md shadow-sm bg-gray-100">
              <p><strong>Dates:</strong> {leave.startDate} - {leave.endDate}</p>
              <p><strong>Reason:</strong> {leave.reason}</p>
              <p><strong>Status:</strong> 
                <span className={`font-bold ${leave.status === "Approved" ? "text-green-600" : "text-red-600"}`}>
                  {leave.status}
                </span>
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LeaveHistory;
