// frontend/src/components/BookingConfirmation.jsx
// Confirmation card shown after a successful payment.
// Displays the booking ID, movie title, show date/time, venue, seat labels,
// and the total amount paid.

import React from 'react';
import { Link } from 'react-router-dom';

export default function BookingConfirmation({ booking }) {
  return (
    <div className="max-w-md mx-auto mt-10">
      <div className="bg-gray-800 rounded-2xl p-8 text-center shadow-2xl">
        <div className="text-5xl mb-4">🎟️</div>
        <h2 className="text-2xl font-bold text-green-400 mb-2">Booking Confirmed!</h2>
        <p className="text-gray-400 mb-6">Your tickets are ready. Enjoy the show!</p>

        <div className="bg-gray-700 rounded-xl p-4 text-left space-y-2 mb-6">
          <p><span className="text-gray-400">Booking ID:</span> #{booking.booking_id}</p>
          <p><span className="text-gray-400">Movie:</span>      {booking.movie}</p>
          <p><span className="text-gray-400">Date:</span>       {booking.show_date} at {booking.show_time}</p>
          <p><span className="text-gray-400">Venue:</span>      {booking.theatre}, {booking.city}</p>
          {booking.seats && (
            <p><span className="text-gray-400">Seats:</span>    {booking.seats}</p>
          )}
          <p className="text-green-400 font-semibold text-lg">
            Total Paid: R{booking.total_amount}
          </p>
        </div>

        <Link to="/"
              className="inline-block bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl font-semibold transition">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
