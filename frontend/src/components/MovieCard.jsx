// frontend/src/components/MovieCard.jsx
// Displays a single movie as a card with a poster placeholder, title,
// genre, duration and a "Book Now" button linking to the movie detail page.

import React from 'react';
import { Link } from 'react-router-dom';

export default function MovieCard({ movie }) {
  return (
    <div className="bg-gray-800 rounded-2xl overflow-hidden shadow-lg flex flex-col hover:scale-105 transition-transform duration-200">
      {/* Poster placeholder */}
      <div className="w-full h-52 bg-gray-700 flex items-center justify-center">
        {movie.poster_url ? (
          <img src={movie.poster_url} alt={movie.title} className="w-full h-full object-cover" />
        ) : (
          <span className="text-gray-500 text-sm">🎞 No Poster</span>
        )}
      </div>

      {/* Card body */}
      <div className="p-4 flex flex-col flex-1">
        <h2 className="text-lg font-bold mb-1 line-clamp-2">{movie.title}</h2>
        <p className="text-sm text-indigo-400 mb-1">{movie.genre}</p>
        <p className="text-sm text-gray-400 mb-3">{movie.duration} min · {movie.language}</p>
        {movie.rating && (
          <p className="text-sm text-yellow-400 mb-3">⭐ {movie.rating}</p>
        )}

        <div className="mt-auto">
          <Link
            to={`/movies/${movie.movie_id}`}
            className="block text-center bg-indigo-600 hover:bg-indigo-500 text-white py-2 rounded-xl font-semibold transition"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
}
