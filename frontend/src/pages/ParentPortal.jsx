// import React, { useState } from 'react';

// const ParentPortal = () => {
//   const [studentId, setStudentId] = useState('');
//   const [otp, setOtp] = useState('');
//   const [step, setStep] = useState(1);

//   const handleRequestOTP = async () => {
//     // Send OTP to registered parent email
//     setStep(2);
//   };

//   const handleVerifyOTP = async () => {
//     // Verify OTP and show student leave records
//     setStep(3);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
//       <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
//         {step === 1 && (
//           <div className="space-y-4">
//             <h2 className="text-2xl font-bold text-center mb-4">Parent Portal Access</h2>
//             <input
//               type="text"
//               placeholder="Student ID"
//               className="w-full p-3 border rounded-lg"
//               value={studentId}
//               onChange={(e) => setStudentId(e.target.value)}
//             />
//             <button
//               onClick={handleRequestOTP}
//               className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600"
//             >
//               Send OTP
//             </button>
//           </div>
//         )}

//         {step === 2 && (
//           <div className="space-y-4">
//             <h3 className="text-xl font-semibold text-center mb-4">Enter OTP</h3>
//             <input
//               type="text"
//               placeholder="Check your email for OTP"
//               className="w-full p-3 border rounded-lg"
//               value={otp}
//               onChange={(e) => setOtp(e.target.value)}
//             />
//             <button
//               onClick={handleVerifyOTP}
//               className="w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600"
//             >
//               Verify OTP
//             </button>
//           </div>
//         )}

//         {step === 3 && (
//           <div>
//             <h3 className="text-xl font-semibold mb-4">Student Leave Records</h3>
//             {/* Display leave records here */}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ParentPortal;




import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LockClosedIcon, EnvelopeIcon, ArrowPathIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

const ParentPortal = () => {
  const [formState, setFormState] = useState({
    studentId: '',
    otp: '',
    step: 1,
    loading: false,
    error: '',
    success: '',
    resendDisabled: true,
    countdown: 60
  });

  // Simulated API calls
  const sendOTP = async (studentId) => {
    return new Promise((resolve) => setTimeout(resolve, 1500));
  };

  const verifyOTP = async (otp) => {
    return new Promise((resolve) => setTimeout(resolve, 1500));
  };

  const handleRequestOTP = async () => {
    try {
      setFormState(prev => ({ ...prev, loading: true, error: '' }));
      await sendOTP(formState.studentId);
      setFormState(prev => ({
        ...prev,
        step: 2,
        loading: false,
        resendDisabled: true,
        countdown: 60
      }));
      startCountdown();
    } catch (error) {
      setFormState(prev => ({
        ...prev,
        loading: false,
        error: 'Failed to send OTP. Please try again.'
      }));
    }
  };

  const handleVerifyOTP = async () => {
    try {
      setFormState(prev => ({ ...prev, loading: true, error: '' }));
      await verifyOTP(formState.otp);
      setFormState(prev => ({
        ...prev,
        step: 3,
        loading: false,
        success: 'OTP verified successfully!'
      }));
    } catch (error) {
      setFormState(prev => ({
        ...prev,
        loading: false,
        error: 'Invalid OTP. Please try again.'
      }));
    }
  };

  const startCountdown = () => {
    const interval = setInterval(() => {
      setFormState(prev => {
        if (prev.countdown <= 1) {
          clearInterval(interval);
          return { ...prev, resendDisabled: false, countdown: 60 };
        }
        return { ...prev, countdown: prev.countdown - 1 };
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full space-y-6 border border-gray-100">
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="inline-block p-4 bg-blue-50 rounded-full"
          >
            <LockClosedIcon className="w-8 h-8 text-blue-600" />
          </motion.div>
          <h1 className="mt-4 text-2xl font-bold text-gray-900">Parent Portal</h1>
          <p className="mt-2 text-gray-600">Secure access to student information</p>
        </div>

        <AnimatePresence mode='wait'>
          {formState.step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Student ID
                </label>
                <div className="relative">
                  <EnvelopeIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Enter student ID"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={formState.studentId}
                    onChange={(e) => setFormState(prev => ({ ...prev, studentId: e.target.value }))}
                  />
                </div>
              </div>

              <button
                onClick={handleRequestOTP}
                disabled={!formState.studentId || formState.loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {formState.loading ? (
                  <ArrowPathIcon className="w-5 h-5 animate-spin" />
                ) : (
                  'Send OTP'
                )}
              </button>
            </motion.div>
          )}

          {formState.step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-4"
            >
              <div className="text-center">
                <CheckCircleIcon className="w-12 h-12 text-green-500 mx-auto" />
                <p className="mt-2 text-gray-600">
                  OTP sent to registered email address
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Enter OTP
                </label>
                <div className="relative">
                  <LockClosedIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Enter 6-digit OTP"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={formState.otp}
                    onChange={(e) => setFormState(prev => ({ ...prev, otp: e.target.value }))}
                  />
                </div>
                <div className="mt-2 text-sm text-gray-500">
                  {formState.resendDisabled ? (
                    `Resend OTP in ${formState.countdown}s`
                  ) : (
                    <button
                      onClick={handleRequestOTP}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      Resend OTP
                    </button>
                  )}
                </div>
              </div>

              <button
                onClick={handleVerifyOTP}
                disabled={formState.otp.length < 6 || formState.loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {formState.loading ? (
                  <ArrowPathIcon className="w-5 h-5 animate-spin" />
                ) : (
                  'Verify OTP'
                )}
              </button>
            </motion.div>
          )}

          {formState.step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <div className="text-center">
                <CheckCircleIcon className="w-12 h-12 text-green-500 mx-auto" />
                <h2 className="mt-4 text-xl font-semibold text-gray-900">
                  Student Leave Records
                </h2>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-600">Date</span>
                  <span className="text-gray-600">Reason</span>
                </div>
                {/* Sample Data - Replace with actual data */}
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-900">2023-10-15</span>
                  <span className="text-gray-600">Medical Appointment</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-900">2023-10-20</span>
                  <span className="text-gray-600">Family Event</span>
                </div>
              </div>

              <button
                onClick={() => setFormState(prev => ({ ...prev, step: 1 }))}
                className="w-full text-blue-600 hover:text-blue-700 py-2 rounded-lg transition-all"
              >
                Back to Start
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error/Success Messages */}
        {formState.error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-3 bg-red-50 text-red-700 rounded-lg border border-red-200"
          >
            ⚠️ {formState.error}
          </motion.div>
        )}

        {formState.success && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-3 bg-green-50 text-green-700 rounded-lg border border-green-200"
          >
            ✓ {formState.success}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ParentPortal;