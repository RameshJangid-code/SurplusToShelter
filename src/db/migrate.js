import { connectDB, closeDB } from './index.js';
await connectDB();
console.log('MongoDB Atlas indexes are up to date.');
await closeDB();
