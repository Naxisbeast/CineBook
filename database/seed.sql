-- database/seed.sql
-- Inserts realistic sample data into cinebook_db.
-- Run AFTER schema.sql: mysql -u root -p cinebook_db < database/seed.sql

USE cinebook_db;

-- ─── Theatres (3) ────────────────────────────────────────────────────────────
INSERT INTO Theatres (name, location, city, phone) VALUES
  ('CineBook Sandton',   '123 Rivonia Road, Sandton',        'Johannesburg', '011-555-0101'),
  ('CineBook Cape Town', '45 Long Street, City Bowl',         'Cape Town',    '021-555-0202'),
  ('CineBook Durban',    '78 Florida Road, Morningside',      'Durban',       '031-555-0303');

-- ─── Screens (2 per theatre = 6 total) ───────────────────────────────────────
INSERT INTO Screens (theatre_id, name, total_seats) VALUES
  (1, 'Screen 1', 40), (1, 'Screen 2', 40),
  (2, 'Screen 1', 40), (2, 'Screen 2', 40),
  (3, 'Screen 1', 40), (3, 'Screen 2', 40);

-- ─── Seats (rows A-E, seats 1-8 per screen = 40 per screen) ─────────────────
-- Generate seats for all 6 screens
INSERT INTO Seats (screen_id, seat_row, seat_number, seat_type)
SELECT s.screen_id,
       ELT(r.n, 'A','B','C','D','E') AS seat_row,
       n2.n                           AS seat_number,
       CASE WHEN r.n = 1 THEN 'premium'
            WHEN r.n = 5 THEN 'vip'
            ELSE 'standard' END       AS seat_type
FROM Screens s
CROSS JOIN (SELECT 1 n UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5) r
CROSS JOIN (SELECT 1 n UNION SELECT 2 UNION SELECT 3 UNION SELECT 4
            UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8) n2;

-- ─── Movies (5) ──────────────────────────────────────────────────────────────
INSERT INTO Movies (title, genre, duration, language, rating, description, release_date) VALUES
  ('Galactic Odyssey',   'Sci-Fi',    148, 'English', 8.4, 'A crew of astronauts ventures beyond the known galaxy.',        '2025-01-15'),
  ('Sunset Boulevard 2', 'Drama',     112, 'English', 7.2, 'A faded director revisits her golden-age Hollywood memories.',   '2025-02-20'),
  ('The Last Heist',     'Thriller',  130, 'English', 8.0, 'An elite crew plans an impossible bank robbery.',                '2025-03-01'),
  ('Laugh Out Loud',     'Comedy',     95, 'English', 7.6, 'A stand-up comedian accidentally becomes a local politician.',   '2025-03-10'),
  ('Ancient Wrath',      'Action',    155, 'English', 7.9, 'A demigod must reclaim a stolen relic before the solstice.',     '2025-03-20');

-- ─── ShowSchedules (10 over next ~2 weeks from 2025-04-01) ───────────────────
INSERT INTO ShowSchedules (movie_id, screen_id, show_date, show_time, price) VALUES
  (1, 1, '2025-04-01', '10:00:00', 120.00),
  (1, 3, '2025-04-02', '14:00:00', 120.00),
  (2, 2, '2025-04-03', '12:00:00', 100.00),
  (3, 4, '2025-04-04', '18:00:00', 130.00),
  (3, 1, '2025-04-05', '20:30:00', 130.00),
  (4, 5, '2025-04-06', '11:00:00',  90.00),
  (5, 6, '2025-04-07', '16:00:00', 110.00),
  (1, 2, '2025-04-09', '19:00:00', 120.00),
  (2, 5, '2025-04-10', '15:00:00', 100.00),
  (5, 3, '2025-04-12', '13:00:00', 110.00);

-- ─── Users (2 test accounts) ─────────────────────────────────────────────────
-- Passwords are bcrypt hashes. Plain-text: admin123 / customer123
INSERT INTO Users (full_name, email, password, role) VALUES
  ('Admin User',  'admin@cinebook.com',   '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lZia', 'admin'),
  ('John Doe',    'john.doe@example.com', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lZia', 'customer');

-- ─── Bookings (3 sample bookings) ────────────────────────────────────────────
INSERT INTO Bookings (user_id, show_id, total_amount, status) VALUES
  (2, 1, 240.00, 'confirmed'),  -- John booked 2 seats for show 1
  (2, 3, 100.00, 'confirmed'),  -- John booked 1 seat  for show 3
  (2, 6,  90.00, 'pending');    -- John booked 1 seat  for show 6

-- ─── BookingSeats ─────────────────────────────────────────────────────────────
-- Booking 1: 2 seats on screen 1 for show 1 (seat A1 = 1, A2 = 2)
INSERT INTO BookingSeats (booking_id, seat_id, show_id) VALUES
  (1, 1, 1),
  (1, 2, 1);
-- Booking 2: 1 seat on screen 2 for show 3 (seat A1 of screen 2 = 41)
INSERT INTO BookingSeats (booking_id, seat_id, show_id) VALUES
  (2, 41, 3);
-- Booking 3: 1 seat on screen 5 for show 6 (seat A1 of screen 5 = 161)
INSERT INTO BookingSeats (booking_id, seat_id, show_id) VALUES
  (3, 161, 6);

-- ─── Payments ─────────────────────────────────────────────────────────────────
INSERT INTO Payments (booking_id, amount, payment_method, payment_status, paid_at) VALUES
  (1, 240.00, 'card', 'completed', '2025-03-25 09:15:00'),
  (2, 100.00, 'eft',  'completed', '2025-03-25 10:30:00'),
  (3,  90.00, 'card', 'pending',   NULL);
