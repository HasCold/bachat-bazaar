const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const { V1_PATH } = require('./shared/constants');
const mainRoutes = require("./routes/index");

const app = express();

// Middleware
app.use(cors({
  origin: [
    process.env.FRONTEND_URL, 
    'http://localhost:5173',
    'http://localhost:3000',
  ],
  credentials: true
}));
app.use(express.json());

// Bachat Bazaar Routes
app.use(V1_PATH, mainRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Bachat Bazaar API is running 🛒' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// Connect to MongoDB
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/bachat-bazaar';

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });
