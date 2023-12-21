const express = require('express');
const passport = require('passport');
const User = require('../Models/UserModel');
const JournalTextModel = require('../Models/journalTextModel');
require('dotenv').config(); // Load environment variables
const router = express.Router();
const isLoggedIn = require("../Middlewares/isLoggedIn");
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const findOrCreate = require('mongoose-findorcreate');
// Import your passport-config.js file
const passportConfig = require("../config/passport-config");
const DeleteJournal = require("../Controllers/DeleteJournal");
// Configure Passport using the exported object
passportConfig.initialize(passport);

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:4006/auth/google/callback",
  passReqToCallback: true
},
function (request, accessToken, refreshToken, profile, done) {
  User.findOrCreate(
    { email: profile.emails[0].value },
    {
      firstName: profile.name.givenName,
      lastName: profile.name.familyName
    },
    function (err, user) {
      if (err) {
        return done(err);
      }
      return done(null, user);
    }
  );
}));


passport.serializeUser((user, done)=>{
    done(null, user);
})
passport.deserializeUser((user, done)=>{
    done(null, user);
})

// Registration route
router.post('/register', async (req, res) => {
    try {
      console.log("Entered register post method in auth.js");
      const { firstName, lastName, email, password } = req.body;
  
      const user = new User({ firstName, lastName, email });
  
      try {
        console.log("Entered inside try block auth.js register");
        await User.register(user, password);
        res.status(200).json({ message: 'Registration successful' });
      } catch (registrationError) {
        console.log("Entered inside catch block");
        console.error('Registration Error:', registrationError);
        res.status(500).json({ message: 'Registration abc Failed' });
      }
    } catch (error) {
      console.log("Entered outside try block..");
      console.error(error.message);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

// Login route with a custom callback
router.post('/login', (req, res, next) => {
    console.log("Inside login route auth.js"); // Log to check if the route is being hit
    // const sessionData = req.session;
    // console.log("session data: ",sessionData);
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        console.error('Error during authentication:', err);
        return res.status(500).json({ message: 'Internal Server Error' });
      }
      if (!user) {
        // User not found or incorrect password
        console.warn('Authentication failed:', info.message);
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      // Log in the user
      req.logIn(user, (err) => {
        if (err) {
          console.error('Error during login:', err);
          return res.status(500).json({ message: 'Internal Server Error' });
        }
        // Authentication successful
        console.log('Login successful:', user);
        return res.status(200).json({ message: 'Login successful' });
      });
    })(req, res, next);
  });
  
// Get all journal entries
router.get('/displayJournals', async (req, res) => {
  try {
    const allJournals = await JournalTextModel.find();
    res.status(200).json(allJournals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a journal entry by ID
// router.put('/updateJournal/:id', async (req, res) => {
//   try {
//     const updatedJournal = await JournalTextModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     res.status(200).json(updatedJournal);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// Delete a journal entry by ID
// router.delete('/deleteJournal/:id', async (req, res) => {
//   try {
//     await JournalTextModel.findByIdAndDelete(req.params.id);
//     res.status(200).json({ message: 'Journal entry deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });
router.delete('/deleteJournal/:id', DeleteJournal);

// Logout route
router.get('/logout', (req, res) => {
  req.logout(); // Passport function to log out
  res.status(200).json({ message: 'Logout successful' });
});

// This is a midddleware can be used for protected routes ex: dashboard which should only be visible to loggedIn users.
// 
// Example of using the isLoggedIn middleware to protect a route
router.get('/protected-route', isLoggedIn, (req, res) => {
    console.log("this is a protected route..cannot be accessed by not loggedIn users..");
  res.status(200).json({ message: 'This route is protected' });
});

module.exports = router;