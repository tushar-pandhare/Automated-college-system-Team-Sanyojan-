import React, { useState, useEffect } from 'react';
import { db, auth } from '/src/firebase.jsx';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

function SubmitApplication() {
  const [applicationData, setApplicationData] = useState({
    name: '',
    description: '',
    priority: 3,
    type: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [userEmail, setUserEmail] = useState(''); // State to store the logged-in user's email

  const PRIORITY_LEVELS = [
    { value: 1, label: 'High' },
    { value: 2, label: 'Medium' },
    { value: 3, label: 'Low' },
  ];

  // Fetch the logged-in user's email on component mount
  useEffect(() => {
    const user = auth.currentUser;
    if (user && user.email) {
      setUserEmail(user.email);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setApplicationData({
      ...applicationData,
      [name]: name === 'priority' ? Number(value) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    if (!applicationData.name || !applicationData.description) {
      setErrorMessage('All fields are required!');
      setIsLoading(false);
      return;
    }

    try {
      const user = auth.currentUser;
      if (!user) throw new Error('Please log in to submit an application');

      await addDoc(collection(db, 'applications'), {
        applicantEmail: userEmail, // Use the logged-in user's email
        applicantName: applicationData.name,
        description: applicationData.description,
        priority: applicationData.priority,
        status: 'Pending',
        timestamp: serverTimestamp(),
        type: applicationData.type,
        userId: user.uid,
        attachments: [],
      });

      setSuccessMessage('Application submitted successfully!');
      setApplicationData({
        name: '',
        description: '',
        priority: 2,
        type: 'Event',
      });
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Submission error:', error);
      setErrorMessage(error.message);
    }
    setIsLoading(false);
  };

  return (
    <div className="max-w-5xl mx-auto my-12 p-12 bg-white rounded-xl shadow-2xl">
      <h2 className="text-3xl font-bold mb-8 text-gray-900 border-b-2 pb-4">
        Application Submission Form
      </h2>

      {(errorMessage || successMessage) && (
        <div className={`mb-8 p-4 rounded-lg text-lg ${errorMessage ? 
          'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {errorMessage || successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="block text-lg font-semibold text-gray-700" htmlFor="name">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={applicationData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="surname yourname fathername"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-lg font-semibold text-gray-700" htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={userEmail} // Display the logged-in user's email
              readOnly // Make the email field read-only
              className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-lg font-semibold text-gray-700" htmlFor="type">
            Application Type
          </label>
          <textarea
            id="type"
            name="type"
            value={applicationData.type}
            onChange={handleInputChange}
            rows="2"
            className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter the type of application (e.g., Event, Maintenance, Complaint, Other)"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-lg font-semibold text-gray-700" htmlFor="description">
            Detailed Description
          </label>
          <textarea
            id="description"
            name="description"
            value={applicationData.description}
            onChange={handleInputChange}
            rows="5"
            className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Describe your application in detail..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="block text-lg font-semibold text-gray-700" htmlFor="priority">
              Priority Level
            </label>
            <select
              id="priority"
              name="priority"
              value={applicationData.priority}
              onChange={handleInputChange}
              className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              {PRIORITY_LEVELS.map(({ value, label }) => (
                <option key={value} value={value} className="text-lg">
                  {label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="pt-8">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-xl font-semibold py-4 px-8 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin h-8 w-8 mr-3 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Processing...
              </div>
            ) : (
              'Submit Application'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default SubmitApplication;