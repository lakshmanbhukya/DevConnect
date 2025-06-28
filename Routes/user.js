const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// @route   POST /api/users/addUser
// @desc    Register a new user and return JWT
// @access  Public
router.get("/users", async (req, res) => {
  try {
    const data = await User.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
