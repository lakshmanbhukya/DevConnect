const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// @route   POST /api/users/addUser
// @desc    Register a new user and return JWT
// @access  Public
router.get('/users', async(req, res) => {
  try{
    const data =await User.find();
    res.json(data);
  }catch(err){
    res.status(500).json({message:err.message});
  }
});
router.post('/addUser', async (req, res) => {
  const { name, email, password, avatar } = req.body;

  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Create user object
    user = new User({ name, email, password, avatar });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Save user
    await user.save();

    // Create JWT payload
   res.json({ msg: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
