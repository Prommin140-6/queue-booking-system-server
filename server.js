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

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'https://queue-booking.vercel.app'],
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// จัดการ OPTIONS request (CORS preflight)
app.options('*', cors()); // อนุญาตทุก route สำหรับ OPTIONS

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