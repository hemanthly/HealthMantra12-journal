require('dotenv').config(); // Load environment variables

const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");

// Import your passport-config.js file
const passportConfig = require("./config/passport-config");

const cors = require('cors');

const sessionSecret = process.env.SESSION_SECRET || 'aVeryLongAndSecureSecret123!@#';

const JournalTextModel = require('./models/journalTextModel');
const userModel = require('./models/UserModel');

const authRoutes = require('./Routes/auth');  // Import the authentication routes

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
    cookie: { maxAge: 60 * 60 * 1000 }, // Session lasts for 1 hour
}));

//Passport middleware setup
app.use(passport.initialize());
app.use(passport.session());

// Configure Passport using the exported object
passportConfig.initialize(passport);

// Use the authentication routes
app.use('/auth', authRoutes);

//Routes
app.get('/', (req, res) => {
    res.send("welcome to node ...!! hemanth");
})

app.get('/blog', (req, res) => {
    res.send("welcome to heFDGFDGDFGalthmantra BLOG!!");
})

// app.post('/register', async(req, res) => {
//     try {
//         console.log("we entered register post method!!");
//         const { firstName, lastName, email, password } = req.body; // object Destructuring the request body

//         const newUser = await userModel.create({ firstName, lastName, email, password });

//         res.status(200).json(newUser);
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).json({message: 'Internal Server Error'});
//     }
// })

// app.post('/login', async (req, res) => {
//     try {
//       const { email, password } = req.body;
  
//       // Find the user by email
//       const user = await User.findOne({ email });
  
//       // If the user is not found or the password is incorrect, send an error response
//       if (!user || !await user.comparePassword(password)) {
//         return res.status(401).json({ message: 'Invalid email or password' });
//       }
  
//       // If the email and password are correct, you can set up a session or token-based authentication here
//       // For simplicity, let's just send a success response
//       res.status(200).json({ message: 'Login successful', user });
//     } catch (error) {
//       console.error(error.message);
//       res.status(500).json({ message: 'Internal Server Error' });
//     }
//   });

app.post('/', async(req, res)=>{

    try {
        const { date, title, message } = req.body; // Destructure the request body

        // Create a new journal entry using the JournalTextModel
        const journal = await JournalTextModel.create({ date, title, message });

        res.status(200).json(journal);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }

    console.log(req.body);
    res.send(req.body);
})

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error while connecting to MongoDB:", error.message);
  });

// Your other routes and configurations go here

app.listen(port, () => {
    console.log(`app is listening to port : ${port}`);
})

