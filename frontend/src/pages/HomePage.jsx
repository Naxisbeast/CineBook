// frontend/src/pages/HomePage.jsx
// Home page — fetches all movies from the API and displays them as a
// responsive grid of MovieCard components.

import React, { useEffect, useState } from 'react';
import api       from '../services/api.js';
import MovieCard from '../components/MovieCard.jsx';

export default function HomePage() {
  const [movies,  setMovies]  = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState('');

  useEffect(() => {
    api.get('/movies')
      .then((res) => setMovies(res.data))
      .catch(() => setError('Failed to load movies. Please try again later.'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center py-16 text-gray-400">Loading movies…</p>;
  if (error)   return <p className="text-center py-16 text-red-400">{error}</p>;

  return (
    <section>
      <h1 className="text-3xl font-bold mb-8 text-center">Now Showing</h1>
      {movies.length === 0 ? (
        <p className="text-center text-gray-400">No movies available at the moment.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <MovieCard key={movie.movie_id} movie={movie} />
          ))}
        </div>
      )}
    </section>
  );
}
