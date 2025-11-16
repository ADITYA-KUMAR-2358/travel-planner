const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Destination = require('../models/Destination');
const User = require('../models/User');
const connectDB = require('../config/database');

dotenv.config();

const sampleDestinations = [
  {
    name: 'Bora Bora Paradise',
    location: {
      country: 'French Polynesia',
      city: 'Bora Bora',
      coordinates: { latitude: -16.5004, longitude: -151.7415 }
    },
    description: 'Experience the ultimate tropical paradise with crystal-clear turquoise waters, overwater bungalows, and stunning coral reefs. Bora Bora offers luxury accommodations, world-class diving, and romantic sunset views.',
    shortDescription: 'Luxury tropical paradise with crystal waters and overwater bungalows',
    price: 3500,
    originalPrice: 4200,
    duration: '7 Days / 6 Nights',
    category: 'beach',
    images: [
      { url: '/images/borabora1.jpg', caption: 'Overwater Bungalow', isPrimary: true },
      { url: '/images/borabora2.jpg', caption: 'Crystal Clear Waters' }
    ],
    amenities: ['5-Star Resort', 'Private Beach', 'Spa', 'Water Sports', 'Fine Dining'],
    included: ['Accommodation', 'Breakfast', 'Airport Transfers', 'Snorkeling Tour'],
    excluded: ['Flights', 'Lunch & Dinner', 'Travel Insurance'],
    maxGroupSize: 2,
    difficulty: 'easy',
    isFeatured: true,
    isActive: true
  },
  {
    name: 'Swiss Alps Adventure',
    location: {
      country: 'Switzerland',
      city: 'Interlaken',
      coordinates: { latitude: 46.6863, longitude: 7.8632 }
    },
    description: 'Embark on an unforgettable journey through the Swiss Alps. Experience breathtaking mountain views, charming alpine villages, and thrilling outdoor activities including skiing, hiking, and paragliding.',
    shortDescription: 'Alpine adventure with skiing, hiking, and mountain views',
    price: 2800,
    duration: '5 Days / 4 Nights',
    category: 'mountain',
    images: [
      { url: '/images/swiss1.jpg', caption: 'Alpine Mountains', isPrimary: true }
    ],
    amenities: ['Mountain Lodge', 'Ski Equipment', 'Guided Tours', 'Cable Car Access'],
    included: ['Accommodation', 'Daily Breakfast', 'Ski Pass', 'Mountain Guide'],
    excluded: ['Flights', 'Meals', 'Personal Equipment'],
    maxGroupSize: 8,
    difficulty: 'challenging',
    isFeatured: true,
    isActive: true
  },
  {
    name: 'Tokyo Cultural Experience',
    location: {
      country: 'Japan',
      city: 'Tokyo',
      coordinates: { latitude: 35.6762, longitude: 139.6503 }
    },
    description: 'Immerse yourself in the vibrant culture of Tokyo. Visit ancient temples, experience modern technology, enjoy authentic cuisine, and explore bustling markets and serene gardens.',
    shortDescription: 'Cultural immersion in Tokyo with temples, cuisine, and modern attractions',
    price: 2200,
    duration: '6 Days / 5 Nights',
    category: 'cultural',
    images: [
      { url: '/images/tokyo1.jpg', caption: 'Tokyo Skyline', isPrimary: true }
    ],
    amenities: ['City Hotel', 'Cultural Guide', 'Public Transport Pass', 'Museum Access'],
    included: ['Accommodation', 'Breakfast', 'City Tour', 'Temple Visits'],
    excluded: ['Flights', 'Lunch & Dinner', 'Shopping'],
    maxGroupSize: 12,
    difficulty: 'moderate',
    isFeatured: true,
    isActive: true
  },
  {
    name: 'Santorini Sunset Romance',
    location: {
      country: 'Greece',
      city: 'Santorini',
      coordinates: { latitude: 36.3932, longitude: 25.4615 }
    },
    description: 'Discover the magic of Santorini with its iconic white-washed buildings, blue-domed churches, and spectacular sunsets. Enjoy wine tasting, beach relaxation, and Mediterranean cuisine.',
    shortDescription: 'Romantic Greek island getaway with stunning sunsets',
    price: 1800,
    duration: '5 Days / 4 Nights',
    category: 'beach',
    images: [
      { url: '/images/santorini1.jpg', caption: 'Santorini Sunset', isPrimary: true }
    ],
    amenities: ['Sea View Hotel', 'Wine Tour', 'Beach Access', 'Traditional Taverna'],
    included: ['Accommodation', 'Breakfast', 'Wine Tasting', 'Boat Tour'],
    excluded: ['Flights', 'Dinners', 'Personal Expenses'],
    maxGroupSize: 4,
    difficulty: 'easy',
    isFeatured: false,
    isActive: true
  },
  {
    name: 'Machu Picchu Trek',
    location: {
      country: 'Peru',
      city: 'Cusco',
      coordinates: { latitude: -13.1631, longitude: -72.5450 }
    },
    description: 'Trek to the ancient Incan citadel of Machu Picchu through the legendary Inca Trail. Experience rich history, stunning mountain scenery, and archaeological wonders.',
    shortDescription: 'Historic trek to ancient Incan ruins through mountain trails',
    price: 1500,
    duration: '4 Days / 3 Nights',
    category: 'adventure',
    images: [
      { url: '/images/machupicchu1.jpg', caption: 'Machu Picchu', isPrimary: true }
    ],
    amenities: ['Camping Equipment', 'Professional Guide', 'Porter Service', 'Permits'],
    included: ['Camping', 'All Meals', 'Entrance Fees', 'Guide Service'],
    excluded: ['Flights to Cusco', 'Travel Insurance', 'Tips'],
    maxGroupSize: 10,
    difficulty: 'challenging',
    isFeatured: true,
    isActive: true
  },
  {
    name: 'Dubai Luxury Escape',
    location: {
      country: 'United Arab Emirates',
      city: 'Dubai',
      coordinates: { latitude: 25.2048, longitude: 55.2708 }
    },
    description: 'Experience the epitome of luxury in Dubai. Visit the tallest building, shop in world-class malls, enjoy desert safaris, and relax in 5-star resorts.',
    shortDescription: 'Luxury city experience with modern attractions and desert adventures',
    price: 2500,
    duration: '5 Days / 4 Nights',
    category: 'luxury',
    images: [
      { url: '/images/dubai1.jpg', caption: 'Dubai Skyline', isPrimary: true }
    ],
    amenities: ['5-Star Hotel', 'Private Tours', 'Shopping Discounts', 'Fine Dining'],
    included: ['Luxury Accommodation', 'Breakfast', 'Desert Safari', 'City Tour'],
    excluded: ['Flights', 'Dinners', 'Shopping'],
    maxGroupSize: 6,
    difficulty: 'easy',
    isFeatured: false,
    isActive: true
  }
];

const seedDatabase = async () => {
  try {
    await connectDB();

    console.log('Clearing existing data...');
    await Destination.deleteMany();
    await User.deleteMany();

    console.log('Creating admin user...');
    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@roamio.com',
      password: 'admin123',
      role: 'admin'
    });

    console.log('Creating sample user...');
    await User.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
      role: 'user'
    });

    console.log('Seeding destinations...');
    await Destination.insertMany(sampleDestinations);

    console.log('Database seeded successfully!');
    console.log(`Admin credentials - Email: admin@roamio.com, Password: admin123`);
    
    process.exit(0);
  } catch (error) {
    console.error(`Error seeding database: ${error.message}`);
    process.exit(1);
  }
};

seedDatabase();
