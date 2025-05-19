const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  carModel: { type: String, required: true }, // เพิ่มฟิลด์รุ่นรถ
  licensePlate: { type: String, required: true }, // เพิ่มฟิลด์หมายเลขทะเบียน
  date: { type: Date, required: true },
  time: { type: String, required: true }, // เพิ่มฟิลด์เวลา (เช่น "09:00")
  status: { type: String, default: 'pending' },
});

module.exports = mongoose.model('Booking', bookingSchema);