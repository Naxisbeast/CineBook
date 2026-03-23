-- database/queries.sql
-- 10 useful SQL queries for the CineBook Online Movie Ticket Booking System.
-- Each query is preceded by a comment explaining its purpose.

USE cinebook_db;

-- ─── Query 1: Get all movies ──────────────────────────────────────────────────
-- Returns the full catalogue of movies ordered alphabetically.
SELECT movie_id, title, genre, duration, language, rating, release_date
FROM Movies
ORDER BY title;

-- ─── Query 2: Get all shows for a specific movie ──────────────────────────────
-- Replace ? with the target movie_id. Returns theatre and screen info.
SELECT ss.show_id,
       m.title                          AS movie,
       t.name                           AS theatre,
       t.city,
       sc.name                          AS screen,
       ss.show_date,
       ss.show_time,
       ss.price
FROM ShowSchedules ss
JOIN Movies  m  ON ss.movie_id  = m.movie_id
JOIN Screens sc ON ss.screen_id = sc.screen_id
JOIN Theatres t ON sc.theatre_id = t.theatre_id
WHERE ss.movie_id = ?
  AND ss.show_date >= CURDATE()
ORDER BY ss.show_date, ss.show_time;

-- ─── Query 3: Get available seats for a specific show ────────────────────────
-- Returns seats that have NOT yet been booked for the given show_id.
SELECT s.seat_id,
       s.seat_row,
       s.seat_number,
       s.seat_type,
       CASE WHEN bs.seat_id IS NULL THEN 'available' ELSE 'booked' END AS status
FROM ShowSchedules ss
JOIN Seats s ON s.screen_id = ss.screen_id
LEFT JOIN BookingSeats bs ON bs.seat_id = s.seat_id AND bs.show_id = ss.show_id
WHERE ss.show_id = ?
ORDER BY s.seat_row, s.seat_number;

-- ─── Query 4: Get a user's full booking history ───────────────────────────────
-- Returns all bookings for a given user_id with movie, show, and payment info.
SELECT b.booking_id,
       m.title                AS movie,
       ss.show_date,
       ss.show_time,
       t.name                 AS theatre,
       b.total_amount,
       b.status               AS booking_status,
       p.payment_status,
       b.booked_at
FROM Bookings b
JOIN ShowSchedules ss ON b.show_id    = ss.show_id
JOIN Movies        m  ON ss.movie_id  = m.movie_id
JOIN Screens       sc ON ss.screen_id = sc.screen_id
JOIN Theatres      t  ON sc.theatre_id = t.theatre_id
LEFT JOIN Payments p  ON p.booking_id = b.booking_id
WHERE b.user_id = ?
ORDER BY b.booked_at DESC;

-- ─── Query 5: Total revenue per movie ─────────────────────────────────────────
-- Aggregates completed payments grouped by movie title.
SELECT m.title                   AS movie,
       COUNT(DISTINCT b.booking_id) AS total_bookings,
       SUM(p.amount)             AS total_revenue
FROM Payments p
JOIN Bookings      b  ON p.booking_id = b.booking_id
JOIN ShowSchedules ss ON b.show_id    = ss.show_id
JOIN Movies        m  ON ss.movie_id  = m.movie_id
WHERE p.payment_status = 'completed'
GROUP BY m.movie_id, m.title
ORDER BY total_revenue DESC;

-- ─── Query 6: Seat occupancy rate per show ────────────────────────────────────
-- Returns the number of booked seats vs. total seats and the occupancy percentage.
SELECT ss.show_id,
       m.title                            AS movie,
       ss.show_date,
       ss.show_time,
       sc.total_seats,
       COUNT(bs.booking_seat_id)          AS booked_seats,
       ROUND(COUNT(bs.booking_seat_id) * 100.0 / sc.total_seats, 2) AS occupancy_pct
FROM ShowSchedules ss
JOIN Movies  m  ON ss.movie_id  = m.movie_id
JOIN Screens sc ON ss.screen_id = sc.screen_id
LEFT JOIN BookingSeats bs ON bs.show_id = ss.show_id
GROUP BY ss.show_id, m.title, ss.show_date, ss.show_time, sc.total_seats
ORDER BY occupancy_pct DESC;

-- ─── Query 7: Top 3 most booked movies ───────────────────────────────────────
-- Counts confirmed bookings per movie and returns the top 3.
SELECT m.movie_id,
       m.title,
       COUNT(b.booking_id) AS total_bookings
FROM Bookings b
JOIN ShowSchedules ss ON b.show_id   = ss.show_id
JOIN Movies        m  ON ss.movie_id = m.movie_id
WHERE b.status = 'confirmed'
GROUP BY m.movie_id, m.title
ORDER BY total_bookings DESC
LIMIT 3;

-- ─── Query 8: All bookings with their payment status ─────────────────────────
-- Full join of bookings and payments for an admin overview.
SELECT b.booking_id,
       u.full_name              AS customer,
       m.title                  AS movie,
       ss.show_date,
       b.total_amount,
       b.status                 AS booking_status,
       COALESCE(p.payment_status, 'no payment') AS payment_status,
       b.booked_at
FROM Bookings b
JOIN Users         u  ON b.user_id    = u.user_id
JOIN ShowSchedules ss ON b.show_id    = ss.show_id
JOIN Movies        m  ON ss.movie_id  = m.movie_id
LEFT JOIN Payments p  ON p.booking_id = b.booking_id
ORDER BY b.booked_at DESC;

-- ─── Query 9: Shows with remaining seats ─────────────────────────────────────
-- Lists upcoming shows that still have at least one seat available.
SELECT ss.show_id,
       m.title                AS movie,
       t.name                 AS theatre,
       ss.show_date,
       ss.show_time,
       ss.price,
       sc.total_seats - COUNT(bs.booking_seat_id) AS remaining_seats
FROM ShowSchedules ss
JOIN Movies  m  ON ss.movie_id   = m.movie_id
JOIN Screens sc ON ss.screen_id  = sc.screen_id
JOIN Theatres t ON sc.theatre_id = t.theatre_id
LEFT JOIN BookingSeats bs ON bs.show_id = ss.show_id
WHERE ss.show_date >= CURDATE()
GROUP BY ss.show_id, m.title, t.name, ss.show_date, ss.show_time, ss.price, sc.total_seats
HAVING remaining_seats > 0
ORDER BY ss.show_date, ss.show_time;

-- ─── Query 10: Monthly revenue report ────────────────────────────────────────
-- Summarises completed payment revenue month by month.
SELECT DATE_FORMAT(p.paid_at, '%Y-%m')    AS month,
       COUNT(p.payment_id)                AS total_payments,
       SUM(p.amount)                      AS total_revenue,
       AVG(p.amount)                      AS avg_payment
FROM Payments p
WHERE p.payment_status = 'completed'
GROUP BY DATE_FORMAT(p.paid_at, '%Y-%m')
ORDER BY month DESC;
