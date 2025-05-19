const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./db');
const bookingRoutes = require('./routes/booking');
const adminRoutes = require('./routes/admin');

dotenv.config();
const app = express();

// Connect to MongoDB
connectDB();

// Dynamic CORS middleware
const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = [
      'http://localhost:3000', // สำหรับ development
      'https://queue-booking-system-client.vercel.app' // สำหรับ production
    ];
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// จัดการ OPTIONS request
app.options('*', cors(corsOptions));

app.use(express.json());

// Routes
app.use('/api/bookings', bookingRoutes);
app.use('/api/admin', adminRoutes);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));