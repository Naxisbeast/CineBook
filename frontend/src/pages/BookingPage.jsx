// frontend/src/pages/BookingPage.jsx
// Booking page — fetches seat availability for the selected show, renders
// the SeatGrid, allows the user to select seats, and submits the booking.

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api      from '../services/api.js';
import SeatGrid from '../components/SeatGrid.jsx';

export default function BookingPage() {
  // TODO: Fetch seat availability for the show from URL params, render SeatGrid with seat toggle support, and on confirm submit the selected seat IDs to POST /api/bookings then navigate to the payment page
  return (
    <div>Seat selection goes here</div>
  );
}
