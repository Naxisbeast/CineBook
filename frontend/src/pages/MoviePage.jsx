// frontend/src/pages/MoviePage.jsx
// Movie detail page — shows full movie information and a list of upcoming
// show times. Each show time links to the BookingPage for that show.

import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api.js';

export default function MoviePage() {
  // TODO: Read the movie id from URL params, fetch the movie details and its show list from the API, then display the movie info and a clickable list of show times linking to the booking page
  return (
    <div>Movie details go here</div>
  );
}
