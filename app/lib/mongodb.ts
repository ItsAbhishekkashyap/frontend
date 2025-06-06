import mongoose from 'mongoose';


let isConnected = false;

export const connectToDB = async () => {
  const MONGODB_URI = process.env.MONGODB_URI;
  console.log('[DEBUG] Full env:', process.env);


  if (!MONGODB_URI) {
    throw new Error('⚠️ Please define MONGODB_URI inside .env.local');
  }

  if (isConnected) return;

  try {
    await mongoose.connect(MONGODB_URI, {
      dbName: 'urlshortener',
    });

    isConnected = true;
    console.log('✅ MongoDB connected');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    throw error;
  }
};



