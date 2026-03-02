import { VercelRequest, VercelResponse } from '@vercel/node';
import mongoose from 'mongoose';

// Location Schema
const locationSchema = new mongoose.Schema({
  latitude: Number,
  longitude: Number,
  timestamp: { type: Date, default: Date.now },
  userAgent: String,
});

const Location = mongoose.model('Location', locationSchema);

let isConnected = false;

async function connectToDatabase() {
  if (isConnected) {
    console.log('✅ Using existing MongoDB connection');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI!, {
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 30000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
      retryWrites: true,
      w: 'majority',
    });
    isConnected = true;
    console.log('✅ Connected to MongoDB');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    throw new Error('Failed to connect to MongoDB');
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { latitude, longitude } = req.body;
    const userAgent = req.headers['user-agent'];

    if (latitude === undefined || longitude === undefined) {
      return res.status(400).json({ error: 'Latitude and longitude are required' });
    }

    await connectToDatabase();

    const newLocation = new Location({
      latitude,
      longitude,
      userAgent,
    });

    await newLocation.save();
    console.log(`✅ Location saved: ${latitude}, ${longitude}`);
    return res.status(201).json({ message: 'Location saved successfully' });
  } catch (err) {
    console.error('❌ Error saving location:', err);
    return res.status(500).json({ error: 'Failed to save location' });
  }
}
