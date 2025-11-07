import React, { useEffect, useState } from "react";
import { fetchHealthStatuses } from "./firebase4";

const ViewHealthStatus = () => {
  const [healthData, setHealthData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadData = async () => {
      const response = await fetchHealthStatuses();
      if (response.success) setHealthData(response.data);
      else setError("Failed to fetch health statuses.");
      setLoading(false);
    };

    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-semibold mb-6 text-center">Health Status Records</h2>
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : healthData.length === 0 ? (
          <p className="text-center text-gray-500">No records found.</p>
        ) : (
          <div className="space-y-4">
            {healthData.map((record) => (
              <div key={record.id} className="border p-4 rounded-lg bg-gray-50 shadow-sm">
                <p><strong>📘 Reg Number:</strong> {record.regNumber}</p>
                <p><strong>🩺 Health Status:</strong> {record.healthStatus}</p>
                <p><strong>📝 Description:</strong> {record.description}</p>
                <p><strong>🛏️ Bed Rest Days:</strong> {record.bedRestDays}</p>
                <p className="text-sm text-gray-500">
                  {record.updatedAt
                    ? `Last updated: ${new Date(record.updatedAt.seconds * 1000).toLocaleString()}`
                    : `Created: ${new Date(record.createdAt.seconds * 1000).toLocaleString()}`}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewHealthStatus;
