-- database/schema.sql
-- Creates the cinebook_db database and all 9 tables required for the CineBook
-- Online Movie Ticket Booking System. Uses InnoDB engine with utf8mb4 charset.

CREATE DATABASE IF NOT EXISTS cinebook_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE cinebook_db;

-- 1. Users — stores registered customers and admins
CREATE TABLE IF NOT EXISTS Users (
  user_id     INT             NOT NULL AUTO_INCREMENT,
  full_name   VARCHAR(100)    NOT NULL,
  email       VARCHAR(150)    NOT NULL UNIQUE,
  password    VARCHAR(255)    NOT NULL,
  role        ENUM('admin','customer') NOT NULL DEFAULT 'customer',
  created_at  DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. Movies — catalogue of films available for booking
CREATE TABLE IF NOT EXISTS Movies (
  movie_id    INT             NOT NULL AUTO_INCREMENT,
  title       VARCHAR(200)    NOT NULL,
  genre       VARCHAR(100)    NOT NULL,
  duration    INT             NOT NULL COMMENT 'Duration in minutes',
  language    VARCHAR(50)     NOT NULL DEFAULT 'English',
  rating      DECIMAL(3,1)    DEFAULT NULL COMMENT 'Rating out of 10',
  poster_url  VARCHAR(500)    DEFAULT NULL,
  description TEXT            DEFAULT NULL,
  release_date DATE           DEFAULT NULL,
  created_at  DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (movie_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. Theatres — physical cinema locations
CREATE TABLE IF NOT EXISTS Theatres (
  theatre_id  INT             NOT NULL AUTO_INCREMENT,
  name        VARCHAR(150)    NOT NULL,
  location    VARCHAR(255)    NOT NULL,
  city        VARCHAR(100)    NOT NULL,
  phone       VARCHAR(20)     DEFAULT NULL,
  PRIMARY KEY (theatre_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. Screens — auditoriums inside a theatre
CREATE TABLE IF NOT EXISTS Screens (
  screen_id   INT             NOT NULL AUTO_INCREMENT,
  theatre_id  INT             NOT NULL,
  name        VARCHAR(50)     NOT NULL,
  total_seats INT             NOT NULL DEFAULT 0,
  PRIMARY KEY (screen_id),
  CONSTRAINT fk_screens_theatre FOREIGN KEY (theatre_id)
    REFERENCES Theatres (theatre_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. Seats — individual seats within a screen
CREATE TABLE IF NOT EXISTS Seats (
  seat_id     INT             NOT NULL AUTO_INCREMENT,
  screen_id   INT             NOT NULL,
  seat_row    CHAR(1)         NOT NULL COMMENT 'Row label, e.g. A–E',
  seat_number INT             NOT NULL,
  seat_type   ENUM('standard','premium','vip') NOT NULL DEFAULT 'standard',
  PRIMARY KEY (seat_id),
  UNIQUE KEY uq_seat (screen_id, seat_row, seat_number),
  CONSTRAINT fk_seats_screen FOREIGN KEY (screen_id)
    REFERENCES Screens (screen_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. ShowSchedules — a specific screening of a movie on a screen
CREATE TABLE IF NOT EXISTS ShowSchedules (
  show_id     INT             NOT NULL AUTO_INCREMENT,
  movie_id    INT             NOT NULL,
  screen_id   INT             NOT NULL,
  show_date   DATE            NOT NULL,
  show_time   TIME            NOT NULL,
  price       DECIMAL(10,2)   NOT NULL DEFAULT 0.00,
  PRIMARY KEY (show_id),
  CONSTRAINT fk_shows_movie  FOREIGN KEY (movie_id)
    REFERENCES Movies (movie_id) ON DELETE CASCADE,
  CONSTRAINT fk_shows_screen FOREIGN KEY (screen_id)
    REFERENCES Screens (screen_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 7. Bookings — a user's reservation for one or more seats at a show
CREATE TABLE IF NOT EXISTS Bookings (
  booking_id      INT             NOT NULL AUTO_INCREMENT,
  user_id         INT             NOT NULL,
  show_id         INT             NOT NULL,
  total_amount    DECIMAL(10,2)   NOT NULL DEFAULT 0.00,
  status          ENUM('pending','confirmed','cancelled') NOT NULL DEFAULT 'pending',
  booked_at       DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (booking_id),
  CONSTRAINT fk_bookings_user FOREIGN KEY (user_id)
    REFERENCES Users (user_id) ON DELETE CASCADE,
  CONSTRAINT fk_bookings_show FOREIGN KEY (show_id)
    REFERENCES ShowSchedules (show_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 8. BookingSeats — seats claimed within a booking (prevents double-booking)
CREATE TABLE IF NOT EXISTS BookingSeats (
  booking_seat_id INT           NOT NULL AUTO_INCREMENT,
  booking_id      INT           NOT NULL,
  seat_id         INT           NOT NULL,
  show_id         INT           NOT NULL,
  PRIMARY KEY (booking_seat_id),
  -- UNIQUE constraint on (show_id, seat_id) prevents the same seat being booked twice
  UNIQUE KEY uq_booking_seat (show_id, seat_id),
  CONSTRAINT fk_bs_booking FOREIGN KEY (booking_id)
    REFERENCES Bookings (booking_id) ON DELETE CASCADE,
  CONSTRAINT fk_bs_seat    FOREIGN KEY (seat_id)
    REFERENCES Seats (seat_id) ON DELETE CASCADE,
  CONSTRAINT fk_bs_show    FOREIGN KEY (show_id)
    REFERENCES ShowSchedules (show_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 9. Payments — payment records linked to a booking
CREATE TABLE IF NOT EXISTS Payments (
  payment_id      INT             NOT NULL AUTO_INCREMENT,
  booking_id      INT             NOT NULL UNIQUE,
  amount          DECIMAL(10,2)   NOT NULL,
  payment_method  ENUM('card','eft','cash','voucher') NOT NULL DEFAULT 'card',
  payment_status  ENUM('pending','completed','failed','refunded') NOT NULL DEFAULT 'pending',
  paid_at         DATETIME        DEFAULT NULL,
  PRIMARY KEY (payment_id),
  CONSTRAINT fk_payments_booking FOREIGN KEY (booking_id)
    REFERENCES Bookings (booking_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
