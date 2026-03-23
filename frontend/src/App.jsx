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

// ProtectedRoute — redirects to /login if the user is not authenticated
function ProtectedRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
}

function AppRoutes() {
  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-6">
        <Routes>
          <Route path="/"               element={<HomePage />} />
          <Route path="/movies/:id"     element={<MoviePage />} />
          <Route path="/login"          element={<LoginPage />} />
          <Route path="/register"       element={<RegisterPage />} />

          <Route path="/booking/:showId" element={
            <ProtectedRoute><BookingPage /></ProtectedRoute>
          } />
          <Route path="/payment/:bookingId" element={
            <ProtectedRoute><PaymentPage /></ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute><ProfilePage /></ProtectedRoute>
          } />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
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
