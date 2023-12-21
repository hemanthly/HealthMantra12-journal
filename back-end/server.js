require('dotenv').config(); // Load environment variables
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const isLoggedIn = require("./Middlewares/isLoggedIn");
const cors = require('cors');

const sessionSecret = process.env.SESSION_SECRET || 'aVeryLongAndSecureSecret123!@#';

const JournalTextModel = require('./Models/journalTextModel');
const userModel = require('./Models/UserModel');
const app = express();
const port = process.env.BACKEND_PORT || 5000;

// Middleware to parse incoming JSON requests
app.use(express.json());

app.use(cors()); // CORS middleware

// Middleware to set basic CORS headers
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Allow specified methods
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // Allow specified headers
    next();
  });

// Session middleware
app.use(session({
    secret: sessionSecret,
    resave: true,
    saveUninitialized: true,
    cookie: { 
        secure: true,
        maxAge: 1 * 60 * 1000  // 1 minute session time
    }, 
}));

//Passport middleware setup
app.use(passport.initialize());
app.use(passport.session());

const routes = require('./Routes/auth');  // Import the authentication routes
app.use('', routes);

app.get('/auth/google',
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }
));

app.get('/auth/google/callback',
    passport.authenticate( 'google', {
        successRedirect: '/auth/protected-journal',
        failureRedirect: '/auth/google/failure'
}));

app.get('/auth/protected-journal', isLoggedIn, (req, res)=>{
    console.log("in protected-journal route.");
    // let name = req.user.displayName;
    let name = "Hemanth";
    res.send(`Hello ${name}, Welcome to private journalling.`);
})

app.get('/auth/google/failure', (req, res)=>{
    res.send("Something went wrong while google O auth athentication!");
})

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error while connecting to MongoDB:", error.message);
  });

// Import your passport-config.js file
const passportConfig = require("./config/passport-config");

// Configure Passport using the exported object
passportConfig.initialize(passport);

// Routes
app.get('/', (req, res) => {
    res.send("welcome to node ...!! hemanth");
});

app.get('/auth/google/home',
    passport.authenticate('google', { failureRedirect: '/' }),
    function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
    }
);

app.post('/journal', isLoggedIn, async(req, res)=>{

    try {
        const { date, title, message } = req.body; // Destructure the request body
        console.log("inside api of journal backend");
        // Create a new journal entry using the JournalTextModel
        const journal = await JournalTextModel.create({ date, title, message });

        res.status(200).json({ success: true, data: journal });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }

})

// Your other routes and configurations go here
app.listen(port, () => {
    console.log(`app is listening to port : ${port}`);
})

