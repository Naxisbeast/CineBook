// frontend/src/pages/RegisterPage.jsx
// Registration page — full_name / email / password form that calls
// POST /api/auth/register, then automatically logs the user in.

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api         from '../services/api.js';
import { useAuth } from '../context/AuthContext.jsx';

export default function RegisterPage() {
  // TODO: Render a full_name, email, and password form, submit to POST /api/auth/register, then auto-login by calling POST /api/auth/login and storing the result via login() from AuthContext, then navigate to the home page
  return (
    <div>Registration form goes here</div>
  );
}
