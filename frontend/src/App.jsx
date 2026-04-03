// frontend/src/App.jsx
// Root application component.
// Sets up React Router with all page routes and wraps the app in the
// AuthContext provider. BookingPage, PaymentPage, and ProfilePage are
// protected and redirect unauthenticated users to the login page.

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';

import Navbar          from './components/Navbar.jsx';
import HomePage        from './pages/HomePage.jsx';
import MoviePage       from './pages/MoviePage.jsx';
import BookingPage     from './pages/BookingPage.jsx';
import PaymentPage     from './pages/PaymentPage.jsx';
import LoginPage       from './pages/LoginPage.jsx';
import RegisterPage    from './pages/RegisterPage.jsx';
import ProfilePage     from './pages/ProfilePage.jsx';

function AppRoutes() {
  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-6">
        <Routes>
          {/* TODO: Define all page routes here, including protected routes for BookingPage, PaymentPage, and ProfilePage that redirect to /login when the user is not authenticated */}
        </Routes>
      </main>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}
