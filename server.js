const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");

const JournalTextModel = require('./models/journalTextModel')

const authRoutes = require('./Routes/auth');  // Import the authentication routes

const app = express();
const port = 3000;

require('dotenv').config(); // Load environment variables

// Middleware to parse incoming JSON requests
app.use(express.json()) 

// Middleware to set basic CORS headers
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Allow specified methods
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // Allow specified headers
    next();
  });

// Session middleware
app.use(session({
    secret: 'your_secret_key',  // Replace with a strong, unique secret
    resave: true,
    saveUninitialized: true,
}));

// Passport middleware setup
app.use(passport.initialize());
app.use(passport.session());

//Routes
app.get('/', (req, res) => {
    res.send("welcome to node ...!! hemanth");
})

app.get('/blog', (req, res) => {
    res.send("welcome to heFDGFDGDFGalthmantra BLOG!!");
})

app.post('/journal', async(req, res)=>{

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

// Use the authentication routes
app.use('/auth', authRoutes);

// Your other routes and configurations go here

app.listen(port, () => {
    console.log(`app is listening to port : ${port}`);
})

