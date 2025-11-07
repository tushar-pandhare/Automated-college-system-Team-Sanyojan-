import { useState, useEffect } from "react";

const FacilityBooking = () => {
  const [facilityName, setFacilityName] = useState("");
  const [date, setDate] = useState("");
  const [purpose, setPurpose] = useState("");
  const [bookings, setBookings] = useState([]);

  const handleBooking = () => {
    if (!facilityName || !date || !purpose) return alert("All fields are required");
    const newBooking = { id: bookings.length + 1, facility: facilityName, date, purpose, status: "Pending" };
    setBookings([...bookings, newBooking]);
    alert("Booking request submitted!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-teal-100 p-8">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-4xl font-bold text-center text-teal-700 mb-6">Campus Facility Booking</h1>

        {/* Booking Form */}
        <div className="bg-gray-100 p-6 shadow-md rounded-lg border border-gray-300 mb-8">
          <h2 className="text-xl font-bold text-gray-700 mb-4">Book a Facility</h2>
          <textarea
            placeholder="Enter Facility Name"
            className="w-full p-3 border rounded-lg focus:ring focus:ring-teal-300 outline-none mb-3"
            value={facilityName}
            onChange={(e) => setFacilityName(e.target.value)}
          />
          <input
            type="date"
            className="w-full p-3 border rounded-lg focus:ring focus:ring-teal-300 outline-none mb-3"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <input
            type="text"
            placeholder="Purpose"
            className="w-full p-3 border rounded-lg focus:ring focus:ring-teal-300 outline-none mb-3"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
          />
          <button
            className="w-full bg-teal-600 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-teal-700 transition"
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
                <th className="border p-3">Purpose</th>
                <th className="border p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length === 0 ? (
                <tr>
                  <td colSpan="4" className="border p-4 text-center text-gray-600">No bookings yet</td>
                </tr>
              ) : (
                bookings.map((booking) => (
                  <tr key={booking.id} className="text-center border hover:bg-gray-100 transition">
                    <td className="border p-3">{booking.facility}</td>
                    <td className="border p-3">{booking.date}</td>
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
