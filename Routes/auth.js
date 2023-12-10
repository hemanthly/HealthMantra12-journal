// routes/auth.js

const express = require('express');
const passport = require('passport');

const router = express.Router();

// Registration route
router.post('/register', (req, res) => {
    // Implement user registration logic here
    res.send('Registration route');
});

// Login route
router.post('/login', passport.authenticate('local', {
    successRedirect: '/',  // Redirect to the home page upon successful login
    failureRedirect: '/login',  // Redirect to the login page upon failed login
    failureFlash: true,
}));

// Logout route
router.get('/logout', (req, res) => {
    req.logout();  // Passport function to log out
    res.redirect('/');
});

// Other authentication routes can be added as needed

module.exports = router;
