// import mongoose from 'mongoose';

// let isConnected = false;

// export const connectToDB = async () => {
//   const MONGODB_URI = process.env.MONGODB_URI;

//   if (!MONGODB_URI) {
//     throw new Error('⚠️ Please define MONGODB_URI in your .env.local file');
//   }

//   if (isConnected) return;

//   try {
//     await mongoose.connect(MONGODB_URI, {
//       dbName: 'urlshortener',
//     });

//     isConnected = true;
//     console.log('✅ MongoDB connected');
//   } catch (error) {
//     console.error('❌ MongoDB connection error:', error);
//     throw error;
//   }
// };


// app/lib/mongodb.ts
// app/lib/mongodb.ts
import mongoose from 'mongoose';

if (!process.env.MONGODB_URI) {
  throw new Error('⚠️ Please define MONGODB_URI in your .env.local');
}

type MongooseCacheType = {
  conn: mongoose.Connection | null;
  promise: Promise<typeof mongoose> | null;
};

// Extend globalThis with an optional mongooseCache property
const globalWithCache = globalThis as typeof globalThis & {
  mongooseCache?: MongooseCacheType;
};

// Initialize cache if not already present
if (!globalWithCache.mongooseCache) {
  globalWithCache.mongooseCache = { conn: null, promise: null };
}

export async function connectToDB(): Promise<mongoose.Connection> {
  const cache = globalWithCache.mongooseCache!;

  // Return existing connection if available
  if (cache.conn) {
    return cache.conn;
  }

  // Create promise once
  if (!cache.promise) {
    cache.promise = mongoose
      .connect(process.env.MONGODB_URI!, { dbName: 'urlshortener' })
      .then((m) => m);
  }

  // Await and cache the connection
  const m = await cache.promise;
  cache.conn = m.connection;
  console.log('✅ MongoDB connected');
  return cache.conn;
}
