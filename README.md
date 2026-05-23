# Secure Web Application

## Description

A secure web application developed for the Application Security and Secure Code course.

This project demonstrates secure coding practices including:

- User Authentication & Authorization
- JWT Session Management
- Password Hashing using bcrypt
- AES Encryption for sensitive data
- Input Validation & Sanitization
- Role-Based Access Control (Admin/User)
- Security Headers using Helmet
- Rate Limiting Protection
- STRIDE Threat Modeling
- DREAD Risk Assessment

---

## Tech Stack

- Frontend: HTML, JavaScript
- Backend: Node.js, Express.js
- Database: MongoDB
- Authentication: JWT + bcrypt
- Encryption: CryptoJS AES
- Security Middleware: Helmet, CORS, express-rate-limit
- Logging: Morgan

---

## Features

- User Registration
- User Login
- JWT Authentication
- Role-Based Access Control (Admin/User)
- Protected Routes
- Admin Dashboard
- Password Hashing using bcrypt
- AES Encryption for Secret Notes
- Input Validation using validator.js
- Security Headers using Helmet
- Content Security Policy (CSP)
- Rate Limiting Protection
- Logging using Morgan

---

## Security Implementations

### Authentication & Authorization
- JWT-based authentication
- Admin/User role-based access control
- Protected routes using middleware

### Password Security
- Passwords are hashed using bcrypt
- Salt rounds implemented for stronger security

### Encryption
- Sensitive data encrypted using AES encryption

### Input Validation & Sanitization
- validator.js used for email validation
- User input sanitized using validator.escape()

### Session Management
- JWT tokens expire after 1 hour
- Tokens verified using middleware

### Security Headers
- Helmet used for security headers
- Content Security Policy (CSP) enabled

### Rate Limiting
- express-rate-limit used to prevent brute-force attacks

### Logging
- Morgan used for request logging

---

## Project Structure

```bash
secure-web-app/
│
├── docs/
├── scans/
├── middleware/
├── models/
├── public/
├── routes/
├── .env
├── package.json
├── server.js
└── README.md
```

---

## Setup Instructions

### Clone Project

```bash
git clone https://github.com/your-username/secure-web-app.git
```

### Open Project Folder

```bash
cd secure-web-app
```

### Install Dependencies

```bash
npm install
```

### Run Server

```bash
npm start
```

Server will run on:

```bash
http://localhost:3000
```

---

## API Routes

### Register User

POST:

```bash
/api/auth/register
```

### Login User

POST:

```bash
/api/auth/login
```

### Protected Profile Route

GET:

```bash
/profile
```

### Admin Route

GET:

```bash
/admin
```

---

## Threat Modeling

See:

- docs/STRIDE_Threat_Model.md
- docs/DREAD_Risk_Assessment.md

---

## Security Tools

The following tools were used for security analysis:

- GitHub CodeQL
- Snyk
- npm audit

Reports and screenshots are included inside the scans/ folder.

---

## Environment Variables

Create a `.env` file and add:

```env
MONGO_URI=mongodb://127.0.0.1:27017/secureApp
JWT_SECRET=anything_secret
PORT=3000
AES_SECRET=my_super_secret_key
```

---

## Deployment

The project can be deployed using:

- Render
- Railway
- Heroku

---

## Author

Application Security Project
CyberSecurity Department