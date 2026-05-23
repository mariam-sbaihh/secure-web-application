const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator');

const CryptoJS = require('crypto-js');

const User = require('../models/User');

/* ========================
   Register Route
======================== */
router.post('/register', async (req, res) => {

  try {

    const { name, email, password, secretNote } = req.body;

    /* ========================
       Input Validation
    ======================== */

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    // Sanitize inputs
    const cleanName = validator.escape(name);
    const cleanEmail = validator.normalizeEmail(email);

    // Validate email
    if (!validator.isEmail(cleanEmail)) {
      return res.status(400).json({
        message: "Invalid email format"
      });
    }

    // Validate password
    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters"
      });
    }

    // Check existing user
    const existingUser = await User.findOne({
      email: cleanEmail
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    /* ========================
       Hash Password
    ======================== */

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(
      password,
      salt
    );

    /* ========================
       Encrypt Secret Note
    ======================== */

    let encryptedNote = '';

    if (secretNote) {

      encryptedNote = CryptoJS.AES.encrypt(
        secretNote,
        process.env.AES_SECRET
      ).toString();

    }

    /* ========================
       Create User
    ======================== */

    const newUser = new User({
      name: cleanName,
      email: cleanEmail,
      password: hashedPassword,
      secretNote: encryptedNote
    });

    await newUser.save();

    res.status(201).json({
      message: "User registered successfully"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});

/* ========================
   Login Route
======================== */
router.post('/login', async (req, res) => {

  try {

    const { email, password } = req.body;

    /* ========================
       Validation
    ======================== */

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required"
      });
    }

    // Sanitize email
    const cleanEmail = validator.normalizeEmail(email);

    // Validate email format
    if (!validator.isEmail(cleanEmail)) {
      return res.status(400).json({
        message: "Invalid email format"
      });
    }

    /* ========================
       Find User
    ======================== */

    const user = await User.findOne({
      email: cleanEmail
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password"
      });
    }

    /* ========================
       Compare Password
    ======================== */

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid email or password"
      });
    }

    /* ========================
       Decrypt Secret Note
    ======================== */

    let decryptedNote = '';

    if (user.secretNote) {

      const bytes = CryptoJS.AES.decrypt(
        user.secretNote,
        process.env.AES_SECRET
      );

      decryptedNote = bytes.toString(
        CryptoJS.enc.Utf8
      );

    }

    /* ========================
       Generate JWT
    ======================== */

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '1h'
      }
    );

    /* ========================
       Response
    ======================== */

    res.json({
      message: "Login successful",
      token,
      role: user.role,
      secretNote: decryptedNote
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});

module.exports = router;