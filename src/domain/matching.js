import { config } from '../config.js';
import { remaining } from './foodClock.js';
export function haversineKm(a, b) { const rad = x => x * Math.PI / 180; const dLat = rad(b.lat - a.lat), dLng = rad(b.lng - a.lng); const h = Math.sin(dLat/2)**2 + Math.cos(rad(a.lat))*Math.cos(rad(b.lat))*Math.sin(dLng/2)**2; return 6371 * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1-h)); }
const travel = km => km * config.travelMinPerKm + config.travelFixedMin;
export function rankCandidates(donation, shelters, drivers = [], at = new Date(), weather = 'warm') {
  const left = remaining(donation, at, weather); if (left <= 0) return [];
  return shelters.map(s => { const km = haversineKm({ lat: donation.pickup_lat, lng: donation.pickup_lng }, s); const closest = drivers.length ? Math.min(...drivers.map(d => haversineKm(d, s))) : 0; const eta_min = travel(km) + travel(closest); const settings = s.settings || s;
    const failures = []; if (!s.verified) failures.push('shelter_unverified'); if (s.open === false) failures.push('shelter_closed'); if (donation.food_type === 'cooked_nonveg' && !settings.accepts_nonveg) failures.push('diet_not_accepted'); if (eta_min > left) failures.push('eta_exceeds_food_clock'); if ((settings.remaining_capacity ?? 0) < donation.qty_plates) failures.push('insufficient_capacity');
    const breakdown = { proximity: 1 - Math.min(km/12,1), need: settings.need_score ?? 0, fairness: 1 - Math.min((settings.received_today ?? 0)/5,1), reliability: settings.reliability_score ?? 0 };
    const score = Object.entries(breakdown).reduce((sum,[k,v]) => sum + v * config.scoreWeights[k], 0);
    return { shelter_id: s.id, km, eta_min, score, breakdown, why: `${km.toFixed(1)} km, room for ${settings.remaining_capacity ?? 0} plates, ${donation.food_type === 'cooked_nonveg' ? 'accepts nonveg' : 'accepts veg'}, ${Math.round(breakdown.need*100)}% need`, eligible: failures.length === 0, reasons: failures };
  }).sort((a,b) => b.score - a.score);
}
export function batchAssign(donations, shelters, at = new Date(), weather = 'warm') { const matrix = donations.map(d => shelters.map(s => rankCandidates(d,[s],[],at,weather)[0]?.score ?? 0)); return matrix; }
