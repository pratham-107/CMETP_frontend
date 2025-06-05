# CMETP – Frontend

The frontend of the **CMETP** (College Management Event & Tracking Platform) is built with **React.js** using **Vite**. It provides a smooth, responsive, and interactive user experience for managing and viewing events.

## 🚀 Features

- JWT-based user authentication (Login & Signup)
- Event dashboard with animations using AOS
- Admin panel to approve/delete events
- RSVP system with real-time counts
- Calendar integration to view highlighted event dates
- Bootstrap 5 styling + responsive layout
- Axios-based API integration
- Deployed on **Vercel**

## 🛠️ Tech Stack

- React.js (with Hooks)
- Vite
- Bootstrap 5 & Bootstrap Icons
- AOS (Animate On Scroll)
- Axios
- React Router DOM
- React Calendar

## 📁 Project Structure
frontend/
│
├── public/
├── src/
│ ├── components/ # Navbar, EventCard, Calendar, etc.
│ ├── pages/ # Dashboard, Login, Signup, etc.
│ ├── styles/ # CSS files
│ ├── App.jsx
│ ├── main.jsx
├── .env # VITE_BACKEND_URL
├── package.json
└── vite.config.js

## ⚙️ Environment Variables

Create a `.env` file in the `frontend` folder:

```env
VITE_BACKEND_URL=http://localhost:5000

npm install     # Install dependencies
npm run dev     # Run in development
npm run build   # Build for production
