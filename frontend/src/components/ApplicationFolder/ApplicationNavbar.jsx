import React from 'react';
import { Link } from 'react-router-dom';

const ApplicationNavbar = () => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg p-4">
      <nav className="flex justify-between items-center max-w-7xl mx-auto">
        <div className="text-white font-bold text-2xl">Application Portal</div>
        <ul className="flex space-x-8">
          <li>
            <Link
              to="/appview"
              className="text-white hover:text-gray-200 text-lg font-semibold transition duration-300"
            >
              View Applications
            </Link>
          </li>
          <li>
            <Link
              to="/appsubmit"
              className="text-white hover:text-gray-200 text-lg font-semibold transition duration-300"
            >
              Submit Application
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default ApplicationNavbar;