const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;
    
    if (!mongoURI) {
      console.warn('⚠️  MONGODB_URI is not defined in environment variables');
      console.warn('⚠️  Server will run without database functionality');
      console.warn('⚠️  Please add MONGODB_URI to your secrets to enable database features');
      return null;
    }

    console.log('Connecting to MongoDB...');
    const conn = await mongoose.connect(mongoURI);

    console.log(`✓ MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    console.warn('⚠️  Server will run without database functionality');
    return null;
  }
};

module.exports = connectDB;
