import React, { useState } from 'react';
import AdminPanel from '../Notifications/AdminPanel';
import ViewHealthStatus from '../Notifications/HealthStatusView';
import LeaveHistory from '../Notifications/LeaveHistory';
import LeaveRequestStatusViewer from '../Notifications/LeaveRequestStatusViewer';

const NotifyBar = () => {
  const [activeComponent, setActiveComponent] = useState('AdminPanel'); // Default component

  const renderComponent = () => {
    switch (activeComponent) {
      case 'AdminPanel':
        return <AdminPanel />;
      case 'ViewHealthStatus':
        return <ViewHealthStatus />;
      case 'LeaveHistory':
        return <LeaveHistory />;
      case 'LeaveRequestStatusViewer':
        return <LeaveRequestStatusViewer />;
      default:
        return <AdminPanel />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-lg rounded-lg p-4 mb-8">
        <ul className="flex space-x-6 justify-center">
          <li>
            <button
              onClick={() => setActiveComponent('AdminPanel')}
              className={`text-lg font-semibold ${
                activeComponent === 'AdminPanel'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Admin Panel
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveComponent('ViewHealthStatus')}
              className={`text-lg font-semibold ${
                activeComponent === 'ViewHealthStatus'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Health Status
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveComponent('LeaveHistory')}
              className={`text-lg font-semibold ${
                activeComponent === 'LeaveHistory'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Leave History
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveComponent('LeaveRequestStatusViewer')}
              className={`text-lg font-semibold ${
                activeComponent === 'LeaveRequestStatusViewer'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Leave Requests
            </button>
          </li>
        </ul>
      </nav>

      {/* Active Component */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        {renderComponent()}
      </div>
    </div>
  );
};

export default NotifyBar;