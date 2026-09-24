import { db } from '../index.js';
export const offers = {
  get: id => db.collection('offers').findOne({ id: String(id) }),
  list: () => db.collection('offers').find().sort({ offered_at: -1 }).toArray(),
  create: async offer => { const doc = { ...offer, id: crypto.randomUUID(), status: 'pending' }; await db.collection('offers').insertOne(doc); return doc.id; }
};
