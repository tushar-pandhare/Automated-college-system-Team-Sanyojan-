import React, { useState } from 'react';
import ManageApplications from '../ApplicationFolder/ManageApplications';
import ViewApplications from '../ApplicationFolder/ViewApplications';

const AdminAppNavbar = () => {
  const [activeComponent, setActiveComponent] = useState('ViewApplications'); // Default component

  const renderComponent = () => {
    switch (activeComponent) {
      case 'ManageApplications':
        return <ManageApplications />;
      case 'ViewApplications':
      default:
        return <ViewApplications />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-lg rounded-lg p-4 mb-8">
        <ul className="flex space-x-6 justify-center">
          <li>
            <button
              onClick={() => setActiveComponent('ViewApplications')}
              className={`text-lg font-semibold ${
                activeComponent === 'ViewApplications'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              View Applications
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveComponent('ManageApplications')}
              className={`text-lg font-semibold ${
                activeComponent === 'ManageApplications'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Manage Applications
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

export default AdminAppNavbar;