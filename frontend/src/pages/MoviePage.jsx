// frontend/src/pages/MoviePage.jsx
// Movie detail page — shows full movie information and a list of upcoming
// show times. Each show time links to the BookingPage for that show.

import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api.js';

export default function MoviePage() {
  const { id } = useParams();
  const [movie,   setMovie]   = useState(null);
  const [shows,   setShows]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState('');

  useEffect(() => {
    api.get(`/movies/${id}`)
      .then((res) => {
        setMovie(res.data.movie);
        setShows(res.data.shows);
      })
      .catch(() => setError('Failed to load movie details.'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="text-center py-16 text-gray-400">Loading…</p>;
  if (error)   return <p className="text-center py-16 text-red-400">{error}</p>;
  if (!movie)  return null;

  return (
    <div className="max-w-3xl mx-auto">
      {/* Movie details */}
      <div className="bg-gray-900 rounded-2xl p-6 mb-8">
        <div className="flex gap-6">
          <div className="w-36 h-52 bg-gray-700 rounded-xl flex items-center justify-center shrink-0">
            <span className="text-gray-500 text-sm">Poster</span>
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
            <p className="text-indigo-400 mb-1">{movie.genre} · {movie.duration} min · {movie.language}</p>
            {movie.rating && (
              <p className="text-yellow-400 mb-3">⭐ {movie.rating} / 10</p>
            )}
            <p className="text-gray-300 leading-relaxed">{movie.description}</p>
          </div>
        </div>
      </div>

      {/* Show schedule */}
      <h2 className="text-2xl font-semibold mb-4">Available Shows</h2>
      {shows.length === 0 ? (
        <p className="text-gray-400">No upcoming shows for this movie.</p>
      ) : (
        <div className="space-y-3">
          {shows.map((show) => (
            <div key={show.show_id}
                 className="bg-gray-800 rounded-xl p-4 flex items-center justify-between">
              <div>
                <p className="font-medium">{show.theatre} — {show.city}</p>
                <p className="text-sm text-gray-400">{show.screen} · {show.show_date} at {show.show_time}</p>
              </div>
              <div className="text-right">
                <p className="text-green-400 font-semibold mb-1">R{show.price}</p>
                <Link to={`/booking/${show.show_id}`}
                      className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm px-4 py-2 rounded-lg transition">
                  Book Seats
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
