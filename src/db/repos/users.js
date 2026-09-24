import { db } from '../index.js';
export const users = {
  byEmail: email => db.collection('users').findOne({ email }),
  byId: id => db.collection('users').findOne({ id: String(id) }, { projection: { password_hash: 0 } }),
  create: async user => { const doc = { ...user, id: crypto.randomUUID() }; await db.collection('users').insertOne(doc); return doc.id; }
};
