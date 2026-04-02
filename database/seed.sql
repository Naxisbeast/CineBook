-- database/seed.sql
-- Inserts realistic sample data into cinebook_db.
-- Run AFTER schema.sql: mysql -u root -p cinebook_db < database/seed.sql

USE cinebook_db;

-- Insert at least 3 theatres with name, location, city, and phone number

-- Insert 2 screens per theatre (6 total), each with a name and total seat count

-- Insert seats for every screen: rows A–E, seats 1–8 per row (40 per screen), with seat types (premium for row A, vip for row E, standard for all others)

-- Insert at least 5 movies with title, genre, duration, language, rating, description, and release_date

-- Insert at least 10 show schedules linking movies to screens with a date, time, and ticket price

-- Insert 2 test user accounts (one admin, one customer) with bcrypt-hashed passwords

-- Insert at least 3 sample bookings for the customer user with different statuses (confirmed, pending)

-- Insert BookingSeats rows linking each booking to the specific seats reserved

-- Insert payment records for the confirmed bookings
