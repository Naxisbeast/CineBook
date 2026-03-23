# CineBook — Online Movie Ticket Booking System

CineBook is a full-stack web application built as a CMPG 311 Database Systems group project by 8 students. It allows users to browse movies, view show schedules, select seats, book tickets, and make payments online.

---

## Tech Stack

| Layer      | Technology                                      |
|------------|-------------------------------------------------|
| Frontend   | React.js (Vite), Tailwind CSS, React Router, Axios |
| Backend    | Node.js, Express.js                             |
| Database   | MySQL                                           |
| Auth       | JWT, bcrypt                                     |
| Dev Tools  | dotenv, nodemon, mysql2, cors                   |

---

## Project Structure

```
cinebook/
├── .gitignore
├── README.md
├── database/
│   ├── schema.sql        # Database schema (9 tables)
│   ├── seed.sql          # Sample data
│   └── queries.sql       # 10 useful SQL queries
├── backend/
│   ├── package.json
│   ├── server.js
│   ├── .env.example
│   ├── db/db.js
│   ├── middleware/verifyToken.js
│   └── routes/
│       ├── auth.js
│       ├── movies.js
│       ├── shows.js
│       ├── seats.js
│       ├── bookings.js
│       └── payments.js
└── frontend/
    ├── package.json
    ├── public/index.html
    └── src/
        ├── index.js
        ├── App.jsx
        ├── services/api.js
        ├── context/AuthContext.jsx
        ├── pages/
        │   ├── HomePage.jsx
        │   ├── MoviePage.jsx
        │   ├── BookingPage.jsx
        │   ├── PaymentPage.jsx
        │   ├── LoginPage.jsx
        │   ├── RegisterPage.jsx
        │   └── ProfilePage.jsx
        └── components/
            ├── Navbar.jsx
            ├── MovieCard.jsx
            ├── SeatGrid.jsx
            └── BookingConfirmation.jsx
```

---

## Setup Instructions

### Prerequisites

- Node.js >= 18
- MySQL >= 8
- npm >= 9

### 1. Database Setup

```bash
# Log into MySQL and run the schema, then seed data
mysql -u root -p < database/schema.sql
mysql -u root -p cinebook_db < database/seed.sql
```

### 2. Backend Setup

```bash
cd backend
npm install

# Copy the environment template and fill in your values
cp .env.example .env
# Edit .env with your MySQL credentials and a JWT secret

# Start the development server
npm run dev
```

The backend will run on **http://localhost:5000**.

### 3. Frontend Setup

```bash
cd frontend
npm install

# Start the Vite dev server
npm run dev
```

The frontend will run on **http://localhost:5173**.

---

## Running the Project

1. Ensure MySQL is running and the database has been initialised.
2. Start the backend: `cd backend && npm run dev`
3. Start the frontend: `cd frontend && npm run dev`
4. Open **http://localhost:5173** in your browser.

### Test Credentials (from seed data)

| Role     | Email                   | Password   |
|----------|-------------------------|------------|
| Admin    | admin@cinebook.com      | admin123   |
| Customer | john.doe@example.com    | customer123 |

---

## Group Members

CMPG 311 Database Systems — Group Project (8 members)

