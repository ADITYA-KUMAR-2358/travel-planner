const mongoose = require('mongoose');

const destinationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a destination name'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  location: {
    country: { type: String, required: true },
    city: { type: String, required: true },
    coordinates: {
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true }
    }
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  shortDescription: {
    type: String,
    required: true,
    maxlength: [200, 'Short description cannot exceed 200 characters']
  },
  price: {
    type: Number,
    required: [true, 'Please provide a price'],
    min: [0, 'Price cannot be negative']
  },
  originalPrice: {
    type: Number
  },
  duration: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['beach', 'mountain', 'city', 'adventure', 'cultural', 'wildlife', 'luxury', 'budget'],
    required: true
  },
  images: [{
    url: { type: String, required: true },
    caption: String,
    isPrimary: { type: Boolean, default: false }
  }],
  amenities: [String],
  included: [String],
  excluded: [String],
  itinerary: [{
    day: Number,
    title: String,
    description: String,
    activities: [String]
  }],
  maxGroupSize: {
    type: Number,
    default: 10
  },
  difficulty: {
    type: String,
    enum: ['easy', 'moderate', 'challenging'],
    default: 'moderate'
  },
  rating: {
    average: { type: Number, default: 0, min: 0, max: 5 },
    count: { type: Number, default: 0 }
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

destinationSchema.index({ name: 'text', description: 'text', 'location.country': 'text', 'location.city': 'text' });
destinationSchema.index({ price: 1 });
destinationSchema.index({ category: 1 });
destinationSchema.index({ 'rating.average': -1 });

destinationSchema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'destination',
  justOne: false
});

module.exports = mongoose.model('Destination', destinationSchema);
