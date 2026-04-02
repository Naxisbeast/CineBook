// frontend/src/pages/LoginPage.jsx
// Login page — email/password form that calls POST /api/auth/login
// and updates the AuthContext with the returned user and JWT token.

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api           from '../services/api.js';
import { useAuth }   from '../context/AuthContext.jsx';

export default function LoginPage() {
  // TODO: Render an email and password form, submit credentials to POST /api/auth/login, call login() from AuthContext with the returned user and token, then navigate to the home page
  return (
    <div>Login form goes here</div>
  );
}
