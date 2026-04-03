// frontend/src/context/AuthContext.jsx
// React context that manages authentication state across the application.
// Provides the current user object, login() and logout() functions.
// Reads a saved token from localStorage on initial load to persist sessions.

import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {

  function login(userData, jwtToken) {
    // TODO: Save the user and token to state and persist them in localStorage
  }

  function logout() {
    // TODO: Clear the user and token from state and remove them from localStorage
  }

  return (
    <AuthContext.Provider value={{ login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
