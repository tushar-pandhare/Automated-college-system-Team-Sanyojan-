import { useEffect, useState } from "react";
import { db, updateLeaveStatus } from "/src/firebase3";
import { getDocs, collection, query, where } from "firebase/firestore";
import { sendEmailResponse } from "./EmailService";

const AdminPanel = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);

  // Fetch only pending leave requests
  const fetchPendingRequests = async () => {
    const q = query(collection(db, "leaveRequests"), where("status", "==", "pending"));
    const querySnapshot = await getDocs(q);
    setLeaveRequests(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  };

  useEffect(() => {
    fetchPendingRequests();
  }, []);

  const handleApproval = async (id, status, studentEmail) => {
    try {
      // Update the status in Firestore
      await updateLeaveStatus(id, status);

      // Send email response
      await sendEmailResponse(studentEmail, status);

      // Remove the approved/rejected request from the UI
      setLeaveRequests((prevRequests) =>
        prevRequests.filter((request) => request.id !== id)
      );

      alert(`Leave request ${status}`);
    } catch (error) {
      console.error("Error updating leave request:", error);
      alert("Failed to update leave request. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h2 className="text-3xl font-bold text-center text-blue-800 mb-8">
        Admin Panel - Approve Leave Requests
      </h2>

      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <ul className="space-y-4">
          {leaveRequests.map((leave) => (
            <li
              key={leave.id}
              className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div className="flex-1">
                  <p className="text-lg font-semibold text-gray-800">
                    {leave.studentEmail}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Dates:</span> {leave.startDate}{" "}
                    - {leave.endDate}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Reason:</span> {leave.reason}
                  </p>
                </div>

                <div className="flex gap-2 mt-4 md:mt-0">
                  <button
                    onClick={() =>
                      handleApproval(leave.id, "approved", leave.studentEmail)
                    }
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() =>
                      handleApproval(leave.id, "rejected", leave.studentEmail)
                    }
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Reject
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        {leaveRequests.length === 0 && (
          <p className="text-center text-gray-500 py-6">
            No pending leave requests found.
          </p>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;