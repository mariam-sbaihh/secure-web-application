require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');

const authMiddleware = require('./middleware/authMiddleware');
const adminMiddleware = require('./middleware/adminMiddleware');

const authRoutes = require('./routes/authRoutes');

const app = express();

/* ========================
   Middleware
======================== */

app.use(express.json());

app.use(express.static('public'));

/* ========================
   Security Middleware
======================== */

// Helmet
app.use(helmet());

// Content Security Policy
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
    },
  })
);

// Secure CORS
app.use(cors({
  origin: 'http://localhost:3000'
}));

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests, please try again later.'
});

app.use(limiter);

// Logging
app.use(morgan('dev'));

/* ========================
   Routes
======================== */

app.use('/api/auth', authRoutes);

/* ========================
   Test Routes
======================== */

app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

app.get("/test", (req, res) => {
  res.json({ ok: true });
});

app.post("/testjson", (req, res) => {
  console.log(req.body);
  res.json(req.body);
});

/* ========================
   Protected Route
======================== */

app.get('/profile', authMiddleware, (req, res) => {

  res.json({
    message: 'Protected profile data',
    user: req.user
  });

});

/* ========================
   Admin Route
======================== */

app.get('/admin', authMiddleware, adminMiddleware, (req, res) => {

  res.json({
    message: 'Welcome Admin ',
    user: req.user
  });

});

/* ========================
   Environment Variables
======================== */

const PORT = process.env.PORT || 3000;

const MONGO_URI = process.env.MONGO_URI;

/* ========================
   MongoDB Connection
======================== */

mongoose.connect(MONGO_URI)

  .then(() => {
    console.log("MongoDB Connected ✅");
  })

  .catch((err) => {
    console.log("Mongo Error ❌", err.message);
  });

/* ========================
   404 Handler
======================== */

app.use((req, res) => {

  res.status(404).json({
    message: "Route not found"
  });

});

/* ========================
   Global Error Handler
======================== */

app.use((err, req, res, next) => {

  console.error("Error :", err);

  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error"
  });

});

/* ========================
   Start Server
======================== */

app.listen(PORT, () => {

  console.log(`Server running on port ${PORT}`);

});