// frontend/src/pages/ProfilePage.jsx
// Profile page — fetches and displays the logged-in user's full booking history,
// including movie title, show details, seats, and payment status.

import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import api         from '../services/api.js';

export default function ProfilePage() {
  const { user }   = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState('');

  useEffect(() => {
    api.get('/my-bookings')
      .then((res) => setBookings(res.data))
      .catch(() => setError('Failed to load booking history.'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center py-16 text-gray-400">Loading…</p>;
  if (error)   return <p className="text-center py-16 text-red-400">{error}</p>;

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">My Profile</h1>
      <p className="text-gray-400 mb-8">{user?.full_name} · {user?.email}</p>

      <h2 className="text-xl font-semibold mb-4">Booking History</h2>
      {bookings.length === 0 ? (
        <p className="text-gray-400">You have no bookings yet.</p>
      ) : (
        <div className="space-y-4">
          {bookings.map((b) => (
            <div key={b.booking_id} className="bg-gray-800 rounded-2xl p-5">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-lg font-semibold">{b.movie}</p>
                  <p className="text-sm text-gray-400">{b.theatre}, {b.city}</p>
                  <p className="text-sm text-gray-400">{b.show_date} at {b.show_time}</p>
                  {b.seats && <p className="text-sm text-gray-300 mt-1">Seats: {b.seats}</p>}
                </div>
                <div className="text-right shrink-0 ml-4">
                  <p className="text-green-400 font-semibold">R{b.total_amount}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full mt-1 inline-block ${
                    b.booking_status === 'confirmed' ? 'bg-green-700 text-green-100' :
                    b.booking_status === 'cancelled' ? 'bg-red-700 text-red-100'    :
                                                       'bg-yellow-700 text-yellow-100'
                  }`}>
                    {b.booking_status}
                  </span>
                  <p className="text-xs text-gray-400 mt-1">Payment: {b.payment_status}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
