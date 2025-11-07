import { useState, useEffect } from "react";
import { submitBooking, fetchBookings } from "../../firebase/bookingService";

const FacilityBooking = () => {
  const [facilityType, setFacilityType] = useState("");
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [purpose, setPurpose] = useState("");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  
  // console.log("Facility Booking component loaded shfjslkfjsdlfjlk");
  const handleBooking = async () => {
    if (!facilityType || !date || !timeSlot || !purpose) {
      alert("All fields are required");
      return;
    }

    const newBooking = {
      facility: facilityType,
      date,
      timeSlot,
      purpose,
      status: "Pending",
      createdAt: new Date()
    };

    const response = await submitBooking(newBooking);
    if (response.success) {
      alert("Booking request submitted!");
      setFacilityType("");
      setDate("");
      setTimeSlot("");
      setPurpose("");
      loadBookings();
    } else {
      alert("Failed to submit booking.");
    }
  };

  const loadBookings = async () => {
    setLoading(true);
    const response = await fetchBookings();
    if (response.success) {
      setBookings(response.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadBookings();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-teal-100 p-8">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-4xl font-bold text-center text-teal-700 mb-6">Campus Facility Booking</h1>

        {/* Booking Form */}
        <div className="bg-gray-100 p-6 shadow-md rounded-lg border border-gray-300 mb-8">
          <h2 className="text-xl font-bold text-gray-700 mb-4">Book a Facility</h2>

          <select
            className="w-full p-3 border rounded-lg mb-3"
            value={facilityType}
            onChange={(e) => setFacilityType(e.target.value)}
          >
            <option value="">Select Facility</option>
            <option value="Ground">Ground</option>
            <option value="Classroom">Classroom</option>
            <option value="Auditorium">Auditorium</option>
            <option value="Lab">Lab</option>
          </select>

          <input
            type="date"
            className="w-full p-3 border rounded-lg mb-3"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <select
            className="w-full p-3 border rounded-lg mb-3"
            value={timeSlot}
            onChange={(e) => setTimeSlot(e.target.value)}
          >
            <option value="">Select Time Slot</option>
            <option value="08:00 - 10:00">08:00 - 10:00</option>
            <option value="10:00 - 12:00">10:00 - 12:00</option>
            <option value="12:00 - 14:00">12:00 - 14:00</option>
            <option value="14:00 - 16:00">14:00 - 16:00</option>
            <option value="16:00 - 18:00">16:00 - 18:00</option>
          </select>

          <input
            type="text"
            placeholder="Purpose"
            className="w-full p-3 border rounded-lg mb-3"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
          />

          <button
            className="w-full bg-teal-600 text-white font-semibold py-3 rounded-lg hover:bg-teal-700 transition"
            onClick={handleBooking}
          >
            Submit Booking
          </button>
        </div>

        {/* Booking Requests Table */}
        <h2 className="text-xl font-bold text-gray-700 mb-4">Your Booking Requests</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse shadow-lg bg-white rounded-lg">
            <thead>
              <tr className="bg-teal-600 text-white">
                <th className="border p-3">Facility</th>
                <th className="border p-3">Date</th>
                <th className="border p-3">Time Slot</th>
                <th className="border p-3">Purpose</th>
                <th className="border p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" className="border p-4 text-center text-gray-500">Loading...</td>
                </tr>
              ) : bookings.length === 0 ? (
                <tr>
                  <td colSpan="5" className="border p-4 text-center text-gray-600">No bookings yet</td>
                </tr>
              ) : (
                bookings.map((booking) => (
                  <tr key={booking.id} className="text-center border hover:bg-gray-100 transition">
                    <td className="border p-3">{booking.facility}</td>
                    <td className="border p-3">{booking.date}</td>
                    <td className="border p-3">{booking.timeSlot}</td>
                    <td className="border p-3">{booking.purpose}</td>
                    <td className={`border p-3 font-semibold ${booking.status === "Approved" ? "text-teal-500" : "text-yellow-500"}`}>
                      {booking.status}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FacilityBooking;




// FacilityBooking.jsx
import { useEffect, useState } from "react";
import { fetchBookings, updateBookingStatus } from "../../firebase/bookingService";

const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadBookings = async () => {
    setLoading(true);
    const response = await fetchBookings();
    if (response.success) {
      setBookings(response.data);
    }
    setLoading(false);
  };

  const handleStatusChange = async (id, status) => {
    const response = await updateBookingStatus(id, status);
    if (response.success) {
      alert(`Booking ${status}`);
      loadBookings();
    } else {
      alert("Failed to update status");
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold text-center text-teal-700 mb-6">Manage Facility Bookings</h2>

        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : bookings.length === 0 ? (
          <p className="text-center text-gray-600">No bookings found.</p>
        ) : (
          <table className="w-full border-collapse shadow-md bg-white rounded-lg">
            <thead>
              <tr className="bg-teal-600 text-white">
                <th className="border p-3">Facility</th>
                <th className="border p-3">Date</th>
                <th className="border p-3">Time Slot</th>
                <th className="border p-3">Purpose</th>
                <th className="border p-3">Status</th>
                <th className="border p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id} className="text-center border hover:bg-gray-50">
                  <td className="border p-3">{booking.facility}</td>
                  <td className="border p-3">{booking.date}</td>
                  <td className="border p-3">{booking.timeSlot}</td>
                  <td className="border p-3">{booking.purpose}</td>
                  <td className={`border p-3 font-semibold ${booking.status === "Approved" ? "text-green-600" : booking.status === "Rejected" ? "text-red-500" : "text-yellow-500"}`}>
                    {booking.status}
                  </td>
                  <td className="border p-3 space-x-2">
                    <button
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                      onClick={() => handleStatusChange(booking.id, "Approved")}
                    >
                      Approve
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      onClick={() => handleStatusChange(booking.id, "Rejected")}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ManageBookings;


//BookingService.js
import { db } from "../firebase";
import { collection, addDoc, getDocs, doc, updateDoc } from "firebase/firestore";

const BOOKINGS_COLLECTION = "facilityBookings";

export const submitBooking = async (booking) => {
  try {
    await addDoc(collection(db, BOOKINGS_COLLECTION), booking);
    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
};

export const fetchBookings = async () => {
  try {
    const snapshot = await getDocs(collection(db, BOOKINGS_COLLECTION));
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return { success: true, data };
  } catch (error) {
    return { success: false, error };
  }
};

export const updateBookingStatus = async (id, status) => {
  try {
    const bookingRef = doc(db, BOOKINGS_COLLECTION, id);
    await updateDoc(bookingRef, { status });
    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
};

