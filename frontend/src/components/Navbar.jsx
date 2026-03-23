// frontend/src/components/Navbar.jsx
// Navigation bar — shows links to Home, and either Login/Register (when logged
// out) or the user's name + Logout (when logged in). Styled with Tailwind CSS.

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate         = useNavigate();

  function handleLogout() {
    logout();
    navigate('/');
  }

  return (
    <nav className="bg-gray-900 shadow-lg">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Brand */}
        <Link to="/" className="text-2xl font-bold text-indigo-400 tracking-wide">
          🎬 CineBook
        </Link>

        {/* Nav links */}
        <div className="flex items-center gap-4">
          <Link to="/" className="text-gray-300 hover:text-white transition">Home</Link>

          {user ? (
            <>
              <Link to="/profile" className="text-gray-300 hover:text-white transition">
                {user.full_name}
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-500 text-white text-sm px-4 py-2 rounded-lg transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login"
                    className="text-gray-300 hover:text-white transition">
                Login
              </Link>
              <Link to="/register"
                    className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm px-4 py-2 rounded-lg transition">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
