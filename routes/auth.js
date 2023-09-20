const express = require('express');
const app = express();
const router = require("express").Router();
const User = require("../models/User")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const cors = require('cors');


dotenv.config();


router.post("/login",async (req, res) => {
    const { email, password } =await req.body;
  
   
    if (!email) {
      return res.status(400).json("No Email");
    }
  
    // Hash the password
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        return res.status(500).json({ error: 'Internal Server Error' });
      }
  
      // Store user data (in-memory for demonstration purposes)
      User.push({ email, password: hashedPassword });
  
      // Redirect to login page
      res.redirect('/login');
    });
});


router.post("/signup", async (req, res) => {
    const { email, password } = req.body;
  
    // Find user by username (replace with database query)
    const user =await  User.findOne({email:email});
  
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
  
    // Compare hashed password
    bcrypt.compare(password, user.password,async (err, result) => {
      if (err || !result) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
  
      // Generate JWT token
      const token =await jwt.sign({ username: user.email }, config.jwtSecret);
  
      // Set token as a cookie (secure this in production)
      res.cookie('token', token);
  
      // Redirect to dashboard
      res.redirect('/welcom');
});
});

router.post('/signout', (req, res) => {
    res.cookie('token', '').json('ok');
})


module.exports = router;