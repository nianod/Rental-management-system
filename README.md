This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

# Rental System Management System

A full‑stack **system management platform** built with **Next.js**. Rental System Management System is designed to manage users, records, and operational workflows efficiently with a modern, scalable, and developer‑friendly architecture.

> ⚡ Built with performance, scalability, and real‑world system management use‑cases in mind.

---

## 🚀 Overview

The **Rental System Management System** is a **landlord–tenant communication and management platform** built to streamline interaction, integrity, transparency, and operational control between **property owners (landlords)** and **tenants**.

At its core, Rental System Management System enables **secure communication**, **structured record management**, and **administrative oversight**, while still supporting all general system management features such as authentication, dashboards, and data control.

The platform is designed to reduce friction in rental management by centralizing:

* Communication between landlords and tenants
* Property-related updates and notices
* Tenant records and system data

It follows modern full-stack best practices using **Next.js App Router**, **API routes**, and **MongoDB (Mongoose)**.

---

## 🧠 Key Features

### 💬 Landlord–Tenant Communication

Secure messaging between landlords and tenants

Centralized communication history

Broadcast announcements (e.g. rent reminders, maintenance notices)

### 🏠 Tenant & Property Management

Tenant records management

Property/room association

Status tracking (active, inactive, vacated)

Vacancy status management per property/unit

### 🔐 Authentication & Authorization

Secure authentication flow

Role-based access control (Landlord / Tenant / Admin)

Protected routes using middleware

### 📊 Dashboard

Role-based dashboards

System summaries and activity overviews

Rent payment insights for landlords

Clean and responsive UI

### 🗂️ Data Management

CRUD operations for tenants, properties, messages, and rent records

MongoDB collections managed using Mongoose models

Server-side validation

### ⚙️ Backend API

Built-in API routes using Next.js

Clean separation of Authentication, Authorization, models, and utilities

Centralized database connection logic

Secure endpoints for rent tracking and vacancy queries

### 🌐 Modern Frontend

Next.js (App Router)

Server Components & Client Components

Responsive layout

Reusable UI components

### 💰 Rent Payment Tracking

Landlords can track rent payments per tenant

Payment status indicators (Paid / Pending / Overdue)

Historical rent records for accountability

### 👀 Public Vacancy Viewing

Visitors can view available vacant rooms or properties

No authentication required for vacancy listings

Clear property details and availability status
---

## 🛠️ Tech Stack

### Frontend

* **Next.js** (App Router)
* **TypeScript & JavaScript**
* **React**
* CSS / Tailwind CSS 

### Backend

* **Next.js API Routes**
* **Node.js** runtime
* **Mongoose** ODM
* **Prisma** ORM

### Database

* **MongoDB** 

### Tooling

* Git & GitHub
* Environment variables (`.env`)
* ESLint
* Prisma

---

## 🔗 Database Connection (Mongoose)

The system uses a **single reusable MongoDB connection** to prevent multiple connections during hot reloads in development.

Key points:

* Connection handled in `lib/db.ts`
* Cached connection for performance
* Uses environment variables for security

---

## 🧩 Models

Each MongoDB collection is defined using a **Mongoose schema**.

Example:

* User Model
* Role‑based fields
* Timestamps enabled

Models are reusable across API routes and server actions.

---

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```env
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=http://localhost:3000
JWT_SECRET=your_secret_key
ADMIN_ID=your_admin_id
ADMIN_PASSWORD=your_password
```

> ⚠️ Never commit `.env.local` to GitHub.

---

## ▶️ Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/nianod/Rental-management-system
cd Rental-management-system
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Run Development Server

```bash
npm run dev
```

App runs on:

```
http://localhost:3000
```

---

## 🧪 API Endpoints (Example)

| Method | Endpoint       | Description     |
| ------ | -------------- | --------------- |
| GET    | /api/users     | Fetch all users |
| POST   | /api/users     | Create new user |
| PUT    | /api/users/:id | Update user     |
| DELETE | /api/users/:id | Delete user     |

---

## 🧠 Design Principles

* **Separation of concerns**
* **Scalable folder structure**
* **Reusable components**
* **Secure by default**
* **Production‑ready architecture**

---

## 🚧 Future Improvements(implementation on progress)

* Real-time messaging (WebSockets)
* Rent payment tracking & reminders
* Maintenance request module
* Read receipts & message status
* File uploads (agreements, notices)
* Notifications (email / in-app)
* Audit logs

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a new branch
3. Commit your changes
4. Open a pull request

---

## 📄 License

This project is licensed under the **MIT License**.

---

> ⭐ If you find this project useful, consider giving it a star!


## Authentication in this system is about access control, not user discovery.


> ## 👨‍💻 Developer

**Arnold**
Aspiring Tech Professional | Full‑Stack Developer