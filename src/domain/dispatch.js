import { haversineKm } from './matching.js';
const sigmoid = x => 1/(1+Math.exp(-x));
/** Heuristic weights can later be fitted with logistic regression on task history. */
export function rankDrivers(task, drivers, hour = new Date().getHours()) { return drivers.map(d => { const km = haversineKm(d, task); const [w0,w1,w2,w3,w4] = [-1,2,1.5,1,.5]; const hourMatch = hour >= 8 && hour <= 20 ? 1 : 0; const claim_probability = sigmoid(w0 + w1*(1-Math.min(km/10,1)) + w2*(d.claim_rate||0) + w3*(d.is_busy?0:1) + w4*hourMatch); return { ...d, km, claim_probability }; }).sort((a,b)=>b.claim_probability-a.claim_probability).slice(0,5); }
