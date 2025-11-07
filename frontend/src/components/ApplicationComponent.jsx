import React from "react";
import { Link } from "react-router-dom";
import { FaEye, FaFileUpload } from "react-icons/fa"; // Import icons from react-icons

const ApplicationPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      {/* Main Content */}
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-blue-800 mb-8 text-center">
          Application Management
        </h1>

        {/* Cards for Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* View Applications Card */}
          <Link
            to="/appview"
            className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center"
          >
            <div className="bg-blue-100 p-4 rounded-full mb-4">
              <FaEye className="text-blue-600 text-3xl" />
            </div>
            <h2 className="text-2xl font-semibold text-blue-700 mb-4">
              View Applications
            </h2>
            <p className="text-gray-600">
              View and manage all submitted applications. Track their status and progress.
            </p>
          </Link>

          {/* Submit Application Card */}
          <Link
            to="/appsubmit"
            className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center"
          >
            <div className="bg-blue-100 p-4 rounded-full mb-4">
              <FaFileUpload className="text-blue-600 text-3xl" />
            </div>
            <h2 className="text-2xl font-semibold text-blue-700 mb-4">
              Submit Application
            </h2>
            <p className="text-gray-600">
              Submit a new application for review. Fill out the required details and upload documents.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ApplicationPage;