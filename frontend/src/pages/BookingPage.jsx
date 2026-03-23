// frontend/src/pages/BookingPage.jsx
// Booking page — fetches seat availability for the selected show, renders
// the SeatGrid, allows the user to select seats, and submits the booking.

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api      from '../services/api.js';
import SeatGrid from '../components/SeatGrid.jsx';

export default function BookingPage() {
  const { showId }   = useParams();
  const navigate     = useNavigate();
  const [seats,      setSeats]      = useState([]);
  const [selected,   setSelected]   = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error,      setError]      = useState('');

  useEffect(() => {
    api.get(`/seats/${showId}`)
      .then((res) => setSeats(res.data))
      .catch(() => setError('Failed to load seat availability.'))
      .finally(() => setLoading(false));
  }, [showId]);

  function handleSeatToggle(seatId) {
    setSelected((prev) =>
      prev.includes(seatId) ? prev.filter((id) => id !== seatId) : [...prev, seatId]
    );
  }

  async function handleBook() {
    if (selected.length === 0) {
      setError('Please select at least one seat.');
      return;
    }
    setSubmitting(true);
    setError('');
    try {
      const res = await api.post('/bookings', { show_id: Number(showId), seat_ids: selected });
      navigate(`/payment/${res.data.booking_id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Booking failed. Please try again.');
      setSubmitting(false);
    }
  }

  if (loading) return <p className="text-center py-16 text-gray-400">Loading seats…</p>;

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Select Your Seats</h1>
      {error && <p className="text-red-400 mb-4 text-center">{error}</p>}

      <SeatGrid seats={seats} selected={selected} onToggle={handleSeatToggle} />

      <div className="mt-6 flex justify-between items-center">
        <p className="text-gray-300">Selected: <span className="font-semibold text-white">{selected.length} seat(s)</span></p>
        <button
          onClick={handleBook}
          disabled={submitting}
          className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white px-6 py-3 rounded-xl font-semibold transition"
        >
          {submitting ? 'Booking…' : 'Confirm Booking'}
        </button>
      </div>
    </div>
  );
}
