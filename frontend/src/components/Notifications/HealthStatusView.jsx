import React, { useEffect, useState } from "react";
import { getHealthStatus } from "/src/components/notifications/firebase4";

const HealthStatusView = () => {
  const [healthData, setHealthData] = useState(null);
  const regNumber = "123456"; // Replace with actual user registration number

  useEffect(() => {
    const fetchData = async () => {
      const response = await getHealthStatus(regNumber);
      if (response.success) {
        setHealthData(response.data);
      } else {
        console.error(response.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold">Health Status</h2>
      {healthData ? (
        <div>
          <p><strong>Status:</strong> {healthData.healthStatus}</p>
          <p><strong>Description:</strong> {healthData.description}</p>
          <p><strong>Bed Rest Days:</strong> {healthData.bedRestDays}</p>
        </div>
      ) : (
        <p>Loading health status...</p>
      )}
    </div>
  );
};

export default HealthStatusView;
