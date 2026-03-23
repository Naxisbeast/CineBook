// frontend/src/pages/PaymentPage.jsx
// Payment page — displays a booking summary and a simple payment form.
// On successful payment the user sees a BookingConfirmation card.

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api                  from '../services/api.js';
import BookingConfirmation  from '../components/BookingConfirmation.jsx';

export default function PaymentPage() {
  const { bookingId } = useParams();
  const [booking,    setBooking]    = useState(null);
  const [method,     setMethod]     = useState('card');
  const [paid,       setPaid]       = useState(false);
  const [paymentData, setPaymentData] = useState(null);
  const [loading,    setLoading]    = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error,      setError]      = useState('');

  useEffect(() => {
    api.get('/my-bookings')
      .then((res) => {
        const found = res.data.find((b) => String(b.booking_id) === String(bookingId));
        setBooking(found || null);
      })
      .catch(() => setError('Failed to load booking details.'))
      .finally(() => setLoading(false));
  }, [bookingId]);

  async function handlePayment(e) {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      const res = await api.post('/payments', {
        booking_id:     Number(bookingId),
        payment_method: method,
      });
      setPaymentData(res.data);
      setPaid(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Payment failed. Please try again.');
      setSubmitting(false);
    }
  }

  if (loading) return <p className="text-center py-16 text-gray-400">Loading booking…</p>;
  if (!booking) return <p className="text-center py-16 text-red-400">Booking not found.</p>;
  if (paid && paymentData) return <BookingConfirmation booking={booking} />;

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Complete Payment</h1>

      {/* Booking summary */}
      <div className="bg-gray-800 rounded-2xl p-5 mb-6 space-y-1">
        <p><span className="text-gray-400">Movie:</span> {booking.movie}</p>
        <p><span className="text-gray-400">Date:</span>  {booking.show_date} at {booking.show_time}</p>
        <p><span className="text-gray-400">Venue:</span> {booking.theatre}, {booking.city}</p>
        <p><span className="text-gray-400">Seats:</span> {booking.seats}</p>
        <p className="text-lg font-semibold text-green-400">
          Total: R{booking.total_amount}
        </p>
      </div>

      {error && <p className="text-red-400 mb-4 text-center">{error}</p>}

      <form onSubmit={handlePayment} className="bg-gray-900 rounded-2xl p-6 space-y-4">
        <div>
          <label className="block text-sm text-gray-400 mb-1">Payment Method</label>
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 focus:outline-none"
          >
            <option value="card">Credit / Debit Card</option>
            <option value="eft">EFT</option>
            <option value="cash">Cash</option>
            <option value="voucher">Voucher</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-green-600 hover:bg-green-500 disabled:opacity-50 text-white py-3 rounded-xl font-semibold transition"
        >
          {submitting ? 'Processing…' : `Pay R${booking.total_amount}`}
        </button>
      </form>
    </div>
  );
}
