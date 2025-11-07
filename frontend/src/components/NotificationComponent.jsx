import React, { useState } from "react";
import LeaveRequestForm from "./Notifications/LeaveRequestForm";
import LeaveRequestStatusViewer from "./Notifications/LeaveRequestStatusViewer";
import HealthStatusView from "./Notifications/HealthStatusView";
import LeaveHistory from "./Notifications/LeaveHistory";
import AdminPanel from "./Notifications/AdminPanel";

const NotificationComponent = () => {
  const [activeTab, setActiveTab] = useState("requestForm"); // Default to "requestForm"

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-center text-blue-800">
        Health & Leave Notifications
      </h1>

      {/* Tabs for Navigation */}
      <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4 mb-8">
        <button
          onClick={() => setActiveTab("requestForm")}
          className={`px-4 sm:px-6 py-2 rounded-lg text-sm sm:text-lg font-semibold transition-colors ${
            activeTab === "requestForm"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Request Form
        </button>
        <button
          onClick={() => setActiveTab("status")}
          className={`px-4 sm:px-6 py-2 rounded-lg text-sm sm:text-lg font-semibold transition-colors ${
            activeTab === "status"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Status
        </button>
        <button
          onClick={() => setActiveTab("healthStatus")}
          className={`px-4 sm:px-6 py-2 rounded-lg text-sm sm:text-lg font-semibold transition-colors ${
            activeTab === "healthStatus"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Health Status
        </button>
      </div>

      {/* Conditional Rendering */}
      <div className="bg-white shadow-lg rounded-lg p-4 sm:p-6">
        {activeTab === "requestForm" && <LeaveRequestForm />}
        {activeTab === "status" && <LeaveRequestStatusViewer />}
        {activeTab === "healthStatus" && <HealthStatusView />}
      </div>
      <div>
                


      </div>
    </div>
  );
};

export default NotificationComponent;