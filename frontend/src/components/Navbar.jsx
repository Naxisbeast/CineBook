// frontend/src/components/Navbar.jsx
// Navigation bar — shows links to Home, and either Login/Register (when logged
// out) or the user's name + Logout (when logged in). Styled with Tailwind CSS.

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Navbar() {
  return (
    <nav></nav>
  );
}
