import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { submitLeaveRequest } from "/src/firebase3";

const LeaveRequestForm = () => {
  const auth = getAuth();
  const [name, setName] = useState("");
  const [reason, setReason] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [totalDays, setTotalDays] = useState(0);
  const [parentContact, setParentContact] = useState("");
  const [guardianContact, setGuardianContact] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (auth.currentUser) {
      setStudentEmail(auth.currentUser.email);
    }
  }, [auth.currentUser]);

  // Calculate total days
  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffTime = end - start;
      const diffDays = diffTime / (1000 * 3600 * 24) + 1;
      setTotalDays(diffDays > 0 ? diffDays : 0);
    }
  }, [startDate, endDate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    // Validation
    if (!name || !reason || !startDate || !endDate || !parentContact || !guardianContact) {
      setMessage("⚠ Please fill all fields.");
      setIsSubmitting(false);
      return;
    }

    if (totalDays <= 0) {
      setMessage("⚠ Invalid date range.");
      setIsSubmitting(false);
      return;
    }

    if (!/^\d{10}$/.test(parentContact) || !/^\d{10}$/.test(guardianContact)) {
      setMessage("⚠ Enter valid 10-digit phone numbers.");
      setIsSubmitting(false);
      return;
    }

    const leaveData = {
      name,
      reason,
      startDate,
      endDate,
      totalDays,
      parentContact,
      guardianContact,
      studentEmail,
      status: "pending",
    };

    const response = await submitLeaveRequest(leaveData);

    if (response.success) {
      setMessage("✅ Leave request submitted successfully! Email sent to student, parent, and coordinator.");
      setName("");
      setReason("");
      setStartDate("");
      setEndDate("");
      setParentContact("");
      setGuardianContact("");
    } else {
      setMessage("❌ Error submitting leave request. Try again.");
    }

    setIsSubmitting(false);
  };

  return (
    <div className="max-w-xl mx-auto bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Leave Request Form</h2>

      {message && <p className="text-center text-red-500">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold">Student Name:</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            className="w-full p-2 border rounded-md" 
            required
          />
        </div>

        <div>
          <label className="block font-semibold">Reason for Leave:</label>
          <textarea 
            value={reason} 
            onChange={(e) => setReason(e.target.value)} 
            className="w-full p-2 border rounded-md h-24" 
            required
          />
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block font-semibold">Start Date:</label>
            <input 
              type="date" 
              value={startDate} 
              onChange={(e) => setStartDate(e.target.value)} 
              className="w-full p-2 border rounded-md" 
              required
            />
          </div>

          <div className="flex-1">
            <label className="block font-semibold">End Date:</label>
            <input 
              type="date" 
              value={endDate} 
              onChange={(e) => setEndDate(e.target.value)} 
              className="w-full p-2 border rounded-md" 
              required
            />
          </div>
        </div>

        <div>
          <label className="block font-semibold">Total Days:</label>
          <input 
            type="number" 
            value={totalDays} 
            readOnly 
            className="w-full p-2 border rounded-md bg-gray-100"
          />
        </div>

        <div>
          <label className="block font-semibold">Parent's Contact:</label>
          <input 
            type="text" 
            value={parentContact} 
            onChange={(e) => setParentContact(e.target.value)} 
            className="w-full p-2 border rounded-md" 
            placeholder="10-digit phone number"
            required
          />
        </div>

        <div>
          <label className="block font-semibold">Guardian's Contact:</label>
          <input 
            type="text" 
            value={guardianContact} 
            onChange={(e) => setGuardianContact(e.target.value)} 
            className="w-full p-2 border rounded-md" 
            placeholder="10-digit phone number"
            required
          />
        </div>

        <div>
          <label className="block font-semibold">Student Email:</label>
          <input 
            type="email" 
            value={studentEmail} 
            readOnly 
            className="w-full p-2 border rounded-md bg-gray-100"
          />
        </div>

        <button 
          type="submit" 
          className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit Request"}
        </button>
      </form>
    </div>
  );
};

export default LeaveRequestForm;
