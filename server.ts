import express from 'express';
import { createServer as createViteServer } from 'vite';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';

if (fs.existsSync('.env.local')) {
  dotenv.config({ path: '.env.local' });
}
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

// Location Schema
const locationSchema = new mongoose.Schema({
  latitude: Number,
  longitude: Number,
  timestamp: { type: Date, default: Date.now },
  userAgent: String,
});

const Location = mongoose.model('Location', locationSchema);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Connect to MongoDB
  if (MONGODB_URI) {
    try {
      await mongoose.connect(MONGODB_URI, {
        serverSelectionTimeoutMS: 10000,
        connectTimeoutMS: 30000,
        socketTimeoutMS: 45000,
        maxPoolSize: 10,
        retryWrites: true,
        w: 'majority',
      });
      console.log('✅ Connected to MongoDB');
    } catch (err) {
      console.error('⚠️  MongoDB connection error (running without database):', err);
      console.log('   Tip: Check MongoDB Atlas network access settings');
    }
  } else {
    console.warn('⚠️  MONGODB_URI not found in environment variables');
  }

  app.use(cors());
  app.use(express.json());

  // API Routes
  app.post('/api/location', async (req, res) => {
    const { latitude, longitude } = req.body;
    const userAgent = req.headers['user-agent'];

    if (latitude === undefined || longitude === undefined) {
      return res.status(400).json({ error: 'Latitude and longitude are required' });
    }

    // Check if MongoDB is connected
    if (mongoose.connection.readyState !== 1) {
      console.log('⚠️  MongoDB not connected (state:', mongoose.connection.readyState, '), skipping location save');
      return res.status(200).json({ message: 'Location tracking temporarily unavailable' });
    }

    try {
      const newLocation = new Location({
        latitude,
        longitude,
        userAgent,
      });
      await newLocation.save();
      console.log(`✅ Location saved: ${latitude}, ${longitude}`);
      res.status(201).json({ message: 'Location saved successfully' });
    } catch (err) {
      console.error('❌ Error saving location:', err);
      res.status(500).json({ error: 'Failed to save location' });
    }
  });

  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected' });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    app.use(express.static('dist'));
    app.get('*', (req, res) => {
      res.sendFile('dist/index.html', { root: '.' });
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
