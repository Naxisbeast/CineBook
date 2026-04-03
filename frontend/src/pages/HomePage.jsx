// frontend/src/pages/HomePage.jsx
// Home page — fetches all movies from the API and displays them as a
// responsive grid of MovieCard components.

import React, { useEffect, useState } from 'react';
import api       from '../services/api.js';
import MovieCard from '../components/MovieCard.jsx';

export default function HomePage() {
  // TODO: Fetch all movies from the API on mount and render them as a grid of MovieCard components, showing a loading state and an error message when appropriate
  return (
    <div>Movie listing goes here</div>
  );
}
