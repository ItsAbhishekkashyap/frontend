import mongoose from 'mongoose';


let isConnected = false;

export const connectToDB = async () => {
  const MONGODB_URI = 'mongodb+srv://abhi47025:mCW3vxV8109BWP0X@cluster0.2gqdjtq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
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



