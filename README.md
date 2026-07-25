# 🚖 Cab Management System

A full-stack cab booking and management web application that lets users book cabs, and lets admins manage drivers, bookings, and payments — built as a DBMS lab project and evolved into a complete Next.js application.

**Live Demo:** [cab-management-two.vercel.app](https://cab-management-two.vercel.app)

---

## 📌 About the Project

The Cab Management System started as a PHP/MySQL microproject for the DBMS Lab course (PCCSL408) and was later rebuilt as a modern full-stack web application using Next.js. It handles the core workflow of a cab booking platform — from user bookings to driver assignment to payment tracking — with a dedicated admin panel for oversight.

---

## ✨ Features

- 🔐 **Admin Login** — secure authentication for administrators
- 🚕 **Cab & Driver Management** — add, view, and manage cabs and driver details
- 📅 **Booking System** — users can book cabs; bookings are tracked in the database
- 💳 **Payment Tracking** — payment records managed via MongoDB Atlas
- 📊 **Relational Data Handling** — structured relational schema (users, drivers, cabs, bookings) built with SQL joins across tables

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend & Backend | [Next.js](https://nextjs.org/) (React) |
| Relational Database | MySQL |
| NoSQL Database | MongoDB Atlas |
| Deployment | Vercel |

---

## 🗂️ Project Origins

- Originally built as a **DBMS Lab microproject (PCCSL408)** — Group 6
- Team members: **Jareena Banu S**, Anand V R, Nihal T P
- Includes a full **ER diagram** covering entities: `users`, `drivers`, `cabs`, `bookings`, with primary keys `user_id`, `driver_id`, `cab_id`, and `booking_id`

---

## 🚀 Getting Started (Run Locally)

### 1. Clone the repository
```bash
git clone https://github.com/jareenabanu/cab_management.git
cd cab_management
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the project root with the following:

```env
DATABASE_URL=mysql://root:your_mysql_password@127.0.0.1:3306/cab_management
MONGODB_URI=your_mongodb_atlas_connection_string
```

### 4. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app running.

---

## 📸 Screenshots

*(Add screenshots of the homepage, booking flow, and admin dashboard here)*

---

## 👩‍💻 Author

**Jareena Banu S**
B.Tech CSE Student, Rajiv Gandhi Institute of Technology (RIT Kottayam), KTU
[LinkedIn](https://linkedin.com/in/jareena-banu-s) · [GitHub](https://github.com/jareenabanu)
