import { useEffect, useState } from "react";
import { db } from "/src/firebase3";
import { collection, getDocs } from "firebase/firestore";

const LeaveRequestStatusViewer = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [filter, setFilter] = useState("all"); // Options: "all", "pending", "approved", "rejected"

  useEffect(() => {
    const fetchRequests = async () => {
      const querySnapshot = await getDocs(collection(db, "leaveRequests"));
      const requests = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setLeaveRequests(requests);
    };
    fetchRequests();
  }, []);

  // Filter leave requests based on selected status
  const filteredRequests =
    filter === "all"
      ? leaveRequests
      : leaveRequests.filter((request) => request.status === filter);

  // Get status badge with color coding
  const getStatusBadge = (status) => {
    const statusStyles = {
      pending: "bg-yellow-100 text-yellow-800",
      approved: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800",
    };

    return (
      <span
        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusStyles[status]}`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h2 className="text-3xl font-bold text-center text-blue-800 mb-8">
        Leave Request Status Viewer
      </h2>

      {/* Filter Options */}
      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded-lg ${
            filter === "all" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter("pending")}
          className={`px-4 py-2 rounded-lg ${
            filter === "pending" ? "bg-yellow-500 text-white" : "bg-gray-200"
          }`}
        >
          Pending
        </button>
        <button
          onClick={() => setFilter("approved")}
          className={`px-4 py-2 rounded-lg ${
            filter === "approved" ? "bg-green-500 text-white" : "bg-gray-200"
          }`}
        >
          Approved
        </button>
        <button
          onClick={() => setFilter("rejected")}
          className={`px-4 py-2 rounded-lg ${
            filter === "rejected" ? "bg-red-500 text-white" : "bg-gray-200"
          }`}
        >
          Rejected
        </button>
      </div>

      {/* Leave Requests Table */}
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6">
        {filteredRequests.length > 0 ? (
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dates
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reason
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredRequests.map((leave) => (
                <tr key={leave.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {leave.studentEmail}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {leave.startDate} - {leave.endDate}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {leave.reason}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {getStatusBadge(leave.status)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-gray-500 py-6">
            No leave requests found.
          </p>
        )}
      </div>
    </div>
  );
};

export default LeaveRequestStatusViewer;