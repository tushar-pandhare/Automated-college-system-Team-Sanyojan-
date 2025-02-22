const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables
const cors = require('cors'); // Import the cors package
const userRouter = require('./routes/userRouter'); // Corrected require statement

const app = express();

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:5173', // Your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// Apply CORS middleware
app.use(cors(corsOptions)); // Enable CORS with specified options

app.use(express.json()); // Parse incoming JSON requests

const URI = process.env.URI;
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(URI)
  .then(() => console.log('Connected Successfully to MongoDB'))
  .catch((error) => console.log('Error:', error));

// Use the userRouter for routes starting with "/users"
app.use('/users', userRouter); // Updated to '/users'

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
