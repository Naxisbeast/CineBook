// frontend/src/pages/ProfilePage.jsx
// Profile page — fetches and displays the logged-in user's full booking history,
// including movie title, show details, seats, and payment status.

import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import api         from '../services/api.js';

export default function ProfilePage() {
  // TODO: Fetch the logged-in user's booking history from GET /api/my-bookings and display each booking's movie, show details, seats, total amount, and payment status
  return (
    <div>Profile and booking history go here</div>
  );
}
