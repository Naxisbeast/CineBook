// frontend/src/pages/PaymentPage.jsx
// Payment page — displays a booking summary and a simple payment form.
// On successful payment the user sees a BookingConfirmation card.

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api                  from '../services/api.js';
import BookingConfirmation  from '../components/BookingConfirmation.jsx';

export default function PaymentPage() {
  // TODO: Fetch the booking details using the bookingId from URL params, show a summary and a payment method selector, submit POST /api/payments on confirm, and swap to the BookingConfirmation component on success
  return (
    <div>Payment form goes here</div>
  );
}
