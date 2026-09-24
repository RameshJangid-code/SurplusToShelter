import { db } from '../index.js';
export const donations = {
  get: id => db.collection('donations').findOne({ id: String(id) }),
  list: () => db.collection('donations').find().sort({ created_at: -1 }).toArray(),
  create: async donation => { const doc = { ...donation, id: crypto.randomUUID() }; await db.collection('donations').insertOne(doc); return doc.id; },
  updateStatus: (id, status) => db.collection('donations').updateOne({ id: String(id) }, { $set: { status } })
};
