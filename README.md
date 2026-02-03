## 🧠 Project Overview

A major issue in the original project concept was that deleting diagnostics, findings, or notes caused permanent loss of data. Initially, I considered marking changes with **blue**, new text in **green**, and deleted text in **red/tachado** using TipTap. However, due to implementation issues, I opted for **plain text storage** to ensure functionality.

The project focuses on realistic workflows:

- Each study generates a **QR code** containing the study results.
- An endpoint allows **viewing results without registration**, simulating public access.
- Database security ensures that **PUT, POST, and DELETE operations are protected**.
- The database was built from scratch to avoid hardcoding, prioritizing **realistic data management**.

### ⚠️ Known Limitations

- Frontend styling is minimal; some features like **account registration and editing** are not implemented.
- TipTap rich text editing could not be integrated.
- Demo prioritizes backend functionality and QR code generation over UI polish.
- Dark and light mode are implemented, and the logo background was removed to improve visual comfort.

> Note: Development time was limited to 2–3 hours per day over the weekend.  

---

## 🛠 Tech Stack

- **Backend:** Node.js, Express, MongoDB, Mongoose, JWT
- **Frontend:** React, Vite, TailwindCSS
- **Additional Libraries:** QRCode.react for QR generation, Zod for validation
- **Authentication & Authorization:** JWT tokens with role-based access

---

## ⚡ Features

- Create, read, update, and delete studies (`/studies`) with role-based access
- User management endpoints (`/users`) for professional users
- QR code generation for study results
- Public access endpoint for viewing study results
- Dark and light mode for the frontend

---

## 📡 API Endpoints

### Auth

| Method | Endpoint       | Description                  | Auth Required |
|--------|----------------|------------------------------|---------------|
| POST   | `/auth/login`  | Login user                   | No            |
| GET    | `/auth/me`     | Get current logged-in user   | Yes           |

### Users

| Method | Endpoint       | Description                          | Auth Required | Role Required   |
|--------|----------------|--------------------------------------|---------------|----------------|
| POST   | `/users`       | Create a new user                     | No            | -              |
| GET    | `/users`       | Get all users                         | No            | -              |
| GET    | `/users/:id`   | Get a user by ID                      | No            | -              |
| PUT    | `/users/:id`   | Update a user                          | Yes           | Professional   |
| DELETE | `/users/:id`   | Delete a user                          | Yes           | Professional   |

### Studies

| Method | Endpoint       | Description                          | Auth Required | Role Required   |
|--------|----------------|--------------------------------------|---------------|----------------|
| GET    | `/studies`     | Get all studies for current user      | Yes           | -              |
| GET    | `/studies/:id` | Get a specific study by ID            | No            | -              |
| POST   | `/studies`     | Create a new study                     | Yes           | Professional   |
| PUT    | `/studies/:id` | Update a study                         | Yes           | Professional   |
| DELETE | `/studies/:id` | Delete a study                         | Yes           | Professional   |

> Note: `/studies/:id` allows public viewing of the study without authentication to display the QR code results.

---

## 🧪 Test Credentials

To try out the application, you can use the following demo credentials:

- **Email:** cafetrucado@gmail.com  
- **Password:** 42688853

