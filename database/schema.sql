-- database/schema.sql
-- Creates the cinebook_db database and all 9 tables required for the CineBook
-- Online Movie Ticket Booking System. Uses InnoDB engine with utf8mb4 charset.

CREATE DATABASE IF NOT EXISTS cinebook_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE cinebook_db;

-- Stores registered customers and admins
CREATE TABLE IF NOT EXISTS Users (
  user_id     INT             NOT NULL AUTO_INCREMENT,
  full_name   VARCHAR(100)    NOT NULL,
  email       VARCHAR(150)    NOT NULL,
  password    VARCHAR(255)    NOT NULL,
  role        ENUM('admin','customer') NOT NULL DEFAULT 'customer',
  created_at  DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Stores the catalogue of films available for booking
CREATE TABLE IF NOT EXISTS Movies (
  movie_id    INT             NOT NULL AUTO_INCREMENT,
  title       VARCHAR(200)    NOT NULL,
  genre       VARCHAR(100)    NOT NULL,
  duration    INT             NOT NULL,
  language    VARCHAR(50)     NOT NULL DEFAULT 'English',
  rating      DECIMAL(3,1)    DEFAULT NULL,
  poster_url  VARCHAR(500)    DEFAULT NULL,
  description TEXT            DEFAULT NULL,
  release_date DATE           DEFAULT NULL,
  created_at  DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (movie_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Stores physical cinema locations
CREATE TABLE IF NOT EXISTS Theatres (
  theatre_id  INT             NOT NULL AUTO_INCREMENT,
  name        VARCHAR(150)    NOT NULL,
  location    VARCHAR(255)    NOT NULL,
  city        VARCHAR(100)    NOT NULL,
  phone       VARCHAR(20)     DEFAULT NULL,
  PRIMARY KEY (theatre_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Stores auditoriums inside a theatre
CREATE TABLE IF NOT EXISTS Screens (
  screen_id   INT             NOT NULL AUTO_INCREMENT,
  theatre_id  INT             NOT NULL,
  name        VARCHAR(50)     NOT NULL,
  total_seats INT             NOT NULL DEFAULT 0,
  PRIMARY KEY (screen_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Stores individual seats within a screen
CREATE TABLE IF NOT EXISTS Seats (
  seat_id     INT             NOT NULL AUTO_INCREMENT,
  screen_id   INT             NOT NULL,
  seat_row    CHAR(1)         NOT NULL,
  seat_number INT             NOT NULL,
  seat_type   ENUM('standard','premium','vip') NOT NULL DEFAULT 'standard',
  PRIMARY KEY (seat_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Stores a specific screening of a movie on a screen
CREATE TABLE IF NOT EXISTS ShowSchedules (
  show_id     INT             NOT NULL AUTO_INCREMENT,
  movie_id    INT             NOT NULL,
  screen_id   INT             NOT NULL,
  show_date   DATE            NOT NULL,
  show_time   TIME            NOT NULL,
  price       DECIMAL(10,2)   NOT NULL DEFAULT 0.00,
  PRIMARY KEY (show_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Stores a user's reservation for one or more seats at a show
CREATE TABLE IF NOT EXISTS Bookings (
  booking_id      INT             NOT NULL AUTO_INCREMENT,
  user_id         INT             NOT NULL,
  show_id         INT             NOT NULL,
  total_amount    DECIMAL(10,2)   NOT NULL DEFAULT 0.00,
  status          ENUM('pending','confirmed','cancelled') NOT NULL DEFAULT 'pending',
  booked_at       DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (booking_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Stores the seats claimed within each booking
CREATE TABLE IF NOT EXISTS BookingSeats (
  booking_seat_id INT           NOT NULL AUTO_INCREMENT,
  booking_id      INT           NOT NULL,
  seat_id         INT           NOT NULL,
  show_id         INT           NOT NULL,
  PRIMARY KEY (booking_seat_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Stores payment records linked to a booking
CREATE TABLE IF NOT EXISTS Payments (
  payment_id      INT             NOT NULL AUTO_INCREMENT,
  booking_id      INT             NOT NULL,
  amount          DECIMAL(10,2)   NOT NULL,
  payment_method  ENUM('card','eft','cash','voucher') NOT NULL DEFAULT 'card',
  payment_status  ENUM('pending','completed','failed','refunded') NOT NULL DEFAULT 'pending',
  paid_at         DATETIME        DEFAULT NULL,
  PRIMARY KEY (payment_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
