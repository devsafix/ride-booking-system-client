# Ridaa - A Fullstack Ride Management System

A **production-ready** ride booking platform built with **React, Redux Toolkit, TypeScript, and Tailwind CSS**, designed to support **Riders, Drivers, and Admins** with role-based dashboards, secure authentication, and a seamless user experience.

---

## Live Deployment

- **Frontend:** https://ridaa.vercel.app
- **Backend:** https://ride-booking-system-backend-by-safi.vercel.app
- **Backend Repository:** https://github.com/devsafix/ride-booking-system-backend

---

## Project Overview

The **Ride Management System** is a web-based platform similar to Uber or Pathao.
It provides three unique experiences based on user roles:

- **Rider** – Request rides, view ride history, track ongoing rides, and manage profiles.
- **Driver** – Accept ride requests, manage earnings, update ride statuses, and track history.
- **Admin** – Oversee users, manage rides, and view analytical dashboards.

The project ensures **responsive UI**, **secure JWT-based authentication**, **state management with Redux Toolkit & RTK Query**, and **proper error handling** across all modules.

---

## Features

### **Public Pages**

- Landing Page with dynamic Hero Section, Service Highlights, Testimonials, and Call-to-Action.
- About, Features, Contact (validated form), and FAQ pages (Searchable list of common questions).
- Fully responsive design with smooth transitions and skeleton loaders.

### **Authentication**

- Role-based login & registration (Rider, Driver, Admin).
- Persistent login using JWT.
- Logout & session management.
- Blocked/Suspended users redirected to a status page.

### **Rider Features**

- Book rides with pickup & destination details.
- View ride history with filters and pagination.
- Manage profile information and password updates.
- Emergency SOS button (during rides) to notify contacts.

### **Driver Features**

- Online/Offline toggle to manage availability.
- Accept/Reject ride requests.
- Earnings Dashboard with charts (daily, weekly, monthly).
- Ride history with filters & pagination.
- Profile and vehicle details management.

### **Admin Features**

- Manage users (search, filter, block/unblock, approve/suspend).
- View all rides with advanced filtering.
- Analytics Dashboard with revenue & activity charts.

### **General UI/UX**

- Role-based navigation menus with dropdowns.
- Toast notifications for success & error states.
- Guided Tour for first-time users.
- Light/Dark mode toggle.
- Global error handling & form validation.

---

## Technology Stack

- **Frontend Framework**: React.js (with React Router for navigation)
- **State Management**: Redux Toolkit + RTK Query
- **Language**: TypeScript
- **Styling**: Tailwind CSS, Shadcn Ui
- **Charts**: Recharts
- **Notifications**: React Hot Toast
- **Guided Tour**: Driver.js
- **Backend API**: Node.js, Express, Mongoose, JWT, bcrypt, zod

---

## Setup Instructions

### **1. Clone Repositories**

```bash
# Frontend
git clone https://github.com/devsafix/ride-booking-system-client
cd ride-booking-system-client

# Backend
git clone https://github.com/devsafix/ride-booking-system-backend
cd ride-booking-system-backend
```

### **2. Install Dependencies**

```bash
npm install
```

### **3. Environment Variables**

Create a `.env` file in **frontend**:

```env
VITE_BASE_URL=http://localhost:5000/api/v1
```

### **4. Run Locally**

```bash
npm run dev
```

### **5. Build for Production**

```bash
npm run build
```

---

## Test Credentials

### Rider

- Email: [devsafix@gmail.com](mailto:rider@test.com)
- Password: 12345678

### Driver

- Email: [demodriver@gmail.com](mailto:driver@test.com)
- Password: 12345678

### Admin

- Email: [admin@ride.com](mailto:admin@test.com)
- Password: 12345678

---

## Author

**Kawser Ferdous Safi** – [devsafix.vercel.app](https://devsafix.vercel.app)
