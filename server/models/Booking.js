const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  destination: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Destination',
    required: true
  },
  bookingReference: {
    type: String,
    unique: true,
    required: true
  },
  travelers: {
    adults: { type: Number, required: true, min: 1 },
    children: { type: Number, default: 0, min: 0 },
    infants: { type: Number, default: 0, min: 0 }
  },
  travelerDetails: [{
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: String,
    dateOfBirth: Date,
    passportNumber: String,
    nationality: String
  }],
  travelDates: {
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true }
  },
  pricing: {
    basePrice: { type: Number, required: true },
    taxes: { type: Number, default: 0 },
    serviceFee: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    totalPrice: { type: Number, required: true }
  },
  payment: {
    method: { type: String, enum: ['credit_card', 'debit_card', 'paypal', 'bank_transfer'], required: true },
    status: { type: String, enum: ['pending', 'completed', 'failed', 'refunded'], default: 'pending' },
    transactionId: String,
    paidAt: Date
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'pending'
  },
  specialRequests: String,
  emergencyContact: {
    name: String,
    phone: String,
    relationship: String
  },
  cancellationReason: String,
  cancelledAt: Date,
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

bookingSchema.pre('save', function(next) {
  if (!this.bookingReference) {
    this.bookingReference = `BK${Date.now()}${Math.floor(Math.random() * 1000)}`;
  }
  next();
});

module.exports = mongoose.model('Booking', bookingSchema);
