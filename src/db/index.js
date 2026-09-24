import { MongoClient } from 'mongodb';
import { config } from '../config.js';
export let client;
export let db;
export async function connectDB() {
  if (!db) {
    const primaryUri = config.mongoUri;
    if (!primaryUri) throw new Error('MONGODB_URI is required. Set it to your MongoDB Atlas connection string in .env.');
    if (!primaryUri.startsWith('mongodb+srv://') && /127\.0\.0\.1|localhost/i.test(primaryUri)) {
      throw new Error('Local MongoDB fallback is disabled. Set MONGODB_URI to the Atlas URI from Connect > Drivers.');
    }

    client = new MongoClient(primaryUri, { family: 4, tls: true, serverSelectionTimeoutMS: 10000, connectTimeoutMS: 10000 });
    try {
      await client.connect();
      db = client.db(config.mongoDbName);
      await db.command({ ping: 1 });
      await Promise.all([
        db.collection('users').createIndex({ email: 1 }, { unique: true }),
        db.collection('donations').createIndex({ status: 1, safe_until: 1 }),
        db.collection('offers').createIndex({ status: 1, expires_at: 1 }),
        db.collection('tasks').createIndex({ status: 1, driver_id: 1 }),
        db.collection('events').createIndex({ entity_type: 1, entity_id: 1, created_at: 1 })
      ]);
      console.log(`Connected to MongoDB Atlas database: ${config.mongoDbName}`);
    } catch (err) {
      db = undefined;
      await client.close().catch(() => undefined);
      client = undefined;
      const reason = err instanceof Error ? err.message : String(err);
      const guidance = /bad auth|authentication failed|AuthenticationFailed/i.test(reason)
        ? 'Verify the MongoDB Database Access username/password (not the Atlas website login) and percent-encode reserved password characters in .env.'
        : 'Check that the Atlas cluster is active, your current IP is allowlisted, and the latest Drivers URI is in .env.';
      throw new Error(`MongoDB Atlas connection failed during startup: ${reason}. ${guidance}`);
    }
  }
  return db;
}
export async function closeDB() { if (db) { await client.close(); db = undefined; } }
export async function event(type, entityType, entityId, payload = {}) {
  const database = db || await connectDB();
  return database.collection('events').insertOne({ entity_type: entityType, entity_id: String(entityId), type, payload, created_at: new Date().toISOString() });
}
