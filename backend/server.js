require('dotenv').config();
const express = require('express');
const mongoSanitize = require('express-mongo-sanitize');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const helmet = require('helmet');
const cors = require('cors');

const app = express();

// Connect Database
connectDB();
const corsOptions = {
    origin: process.env.NODE_ENV === 'production' 
      ? ['https://localhost:5000'] 
      : '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true
  };
  

// Middleware
app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json());
app.use(mongoSanitize());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/payments', paymentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));