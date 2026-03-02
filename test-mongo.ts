import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';

if (fs.existsSync('.env.local')) dotenv.config({ path: '.env.local' });
dotenv.config();

console.log('URI:', process.env.MONGODB_URI?.replace(/:([^:@]+)@/, ':***@'));
// Hide password in logs

mongoose.connect(process.env.MONGODB_URI as string)
    .then(() => {
        console.log('Success! Connected to MongoDB.');
        process.exit(0);
    })
    .catch(err => {
        console.error('Error:', err.message);
        process.exit(1);
    });
