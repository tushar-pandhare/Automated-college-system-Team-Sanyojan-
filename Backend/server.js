// // import express from 'express';
// // import mongoose from 'mongoose';
// // import dotenv from 'dotenv';
// // import cors from 'cors';
// // import electionRoutes from './routes/electionRoutes.jsx';
// // import authRoutes from './routes/authRoutes.js';

// // dotenv.config();

// // const app = express();
// // app.use(cors());
// // app.use(express.json());

// // // Database connection
// // mongoose.connect(process.env.MONGODB_URI)
// //   .then(() => console.log('Connected to MongoDB'))
// //   .catch(err => console.error('MongoDB connection error:', err));

// // // Routes
// // app.use('/api/auth', authRoutes);
// // app.use('/api/elections', electionRoutes);

// // const PORT = process.env.PORT || 5000;
// // app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// import express from 'express';
// import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// import cors from 'cors';
// import electionRoutes from './routes/electionRoutes.js';
// import authRoutes from './routes/authRoutes.js';

// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// // Database connection
// mongoose.connect(process.env.MONGODB_URI)
//   .then(() => console.log('Connected to MongoDB'))
//   .catch(err => console.error('MongoDB connection error:', err));

// // Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/elections', electionRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const { Server } = require('socket.io');
const http = require('http');
require('dotenv').config();


const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173', // Update with your Vite port
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/elections', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Define Schemas
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  hasVoted: { type: Boolean, default: false }
});

const ElectionSchema = new mongoose.Schema({
  title: String,
  description: String,
  startDate: Date,
  endDate: Date,
  isActive: Boolean
});

const CandidateSchema = new mongoose.Schema({
  name: String,
  department: String,
  manifesto: String,
  election: { type: mongoose.Schema.Types.ObjectId, ref: 'Election' },
  votes: { type: Number, default: 0 }
});

const User = mongoose.model('User', UserSchema);
const Election = mongoose.model('Election', ElectionSchema);
const Candidate = mongoose.model('Candidate', CandidateSchema);

// Middleware
app.use(cors());
app.use(express.json());

const authenticate = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).send('Access denied');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findOne({ email: decoded.email });
    next();
  } catch (err) {
    res.status(401).send('Invalid token');
  }
};

// Routes
app.post('/api/login', async (req, res) => {
  const { email } = req.body;
  if (!email.endsWith('.edu')) return res.status(400).send('Invalid college email');

  let user = await User.findOne({ email });
  if (!user) user = await User.create({ email });
  
  const token = jwt.sign({ email }, process.env.JWT_SECRET);
  res.send({ token });
});

app.get('/api/elections', authenticate, async (req, res) => {
  const elections = await Election.find({ isActive: true });
  res.json(elections);
});

app.get('/api/candidates/:electionId', authenticate, async (req, res) => {
  const candidates = await Candidate.find({ election: req.params.electionId });
  res.json(candidates);
});

app.post('/api/vote', authenticate, async (req, res) => {
  if (req.user.hasVoted) return res.status(400).send('Already voted');
  
  const candidate = await Candidate.findById(req.body.candidateId);
  candidate.votes += 1;
  await candidate.save();
  
  req.user.hasVoted = true;
  await req.user.save();

  io.emit('voteUpdate', await Candidate.find({ election: candidate.election }));
  res.send('Vote recorded');
});

// Socket.io for real-time updates
io.on('connection', () => {
  console.log('Client connected');
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));