-- database/queries.sql
-- 10 useful SQL queries for the CineBook Online Movie Ticket Booking System.
-- Each query is preceded by a comment explaining its purpose.

USE cinebook_db;

-- Query 1: Get all movies
-- Returns the full catalogue of movies ordered alphabetically.

-- Query 2: Get all shows for a specific movie
-- Returns show schedule rows including theatre name, city, screen name, date, time, and price for a given movie_id.

-- Query 3: Get available seats for a specific show
-- Returns all seats for the show's screen, each labelled as 'available' or 'booked', for a given show_id.

-- Query 4: Get a user's full booking history
-- Returns all bookings for a given user_id with movie title, show date/time, theatre, total amount, booking status, and payment status.

-- Query 5: Total revenue per movie
-- Aggregates completed payment amounts grouped by movie title, showing total bookings and total revenue per movie.

-- Query 6: Seat occupancy rate per show
-- Returns each show with total seats, number of booked seats, and the occupancy percentage.

-- Query 7: Top 3 most booked movies
-- Counts confirmed bookings per movie and returns only the top 3 by booking count.

-- Query 8: All bookings with their payment status
-- Returns a full admin overview joining bookings, users, movies, show schedules, and payments.

-- Query 9: Shows with remaining seats
-- Lists only upcoming shows that still have at least one seat available, including the remaining seat count.

-- Query 10: Monthly revenue report
-- Summarises completed payment revenue grouped by month, showing total payments, total revenue, and average payment per month.
