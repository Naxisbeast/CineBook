// frontend/src/pages/LoginPage.jsx
// Login page — email/password form that calls POST /api/auth/login
// and updates the AuthContext with the returned user and JWT token.

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api           from '../services/api.js';
import { useAuth }   from '../context/AuthContext.jsx';

export default function LoginPage() {
  const { login }  = useAuth();
  const navigate   = useNavigate();
  const [form,     setForm]     = useState({ email: '', password: '' });
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState('');

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await api.post('/auth/login', form);
      login(res.data.user, res.data.token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-sm mx-auto mt-16">
      <h1 className="text-3xl font-bold text-center mb-8">Sign In</h1>
      {error && <p className="text-red-400 text-center mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="bg-gray-900 rounded-2xl p-6 space-y-4">
        <div>
          <label className="block text-sm text-gray-400 mb-1">Email</label>
          <input
            type="email" name="email" value={form.email}
            onChange={handleChange} required
            className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1">Password</label>
          <input
            type="password" name="password" value={form.password}
            onChange={handleChange} required
            className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <button
          type="submit" disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white py-3 rounded-xl font-semibold transition"
        >
          {loading ? 'Signing in…' : 'Sign In'}
        </button>
      </form>
      <p className="text-center mt-4 text-gray-400">
        Don't have an account?{' '}
        <Link to="/register" className="text-indigo-400 hover:underline">Register</Link>
      </p>
    </div>
  );
}
