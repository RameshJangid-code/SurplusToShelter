import { config } from '../config.js';
const ms = 60000;
/** Calculate safe time. Demo defaults use the 2-hour/4-hour temperature-danger-zone principle and need local validation. */
export function safeUntil(donation, weather = 'warm') {
  const cooked = new Date(donation.cooked_at || donation.cookedAt || donation.created_at || Date.now()).getTime();
  const windows = config.foodWindows[donation.food_type] || config.foodWindows.cooked_veg;
  const derived = cooked + (windows[weather] ?? windows.warm) * ms;
  const printed = donation.printed_expiry ? new Date(donation.printed_expiry).getTime() : Infinity;
  return new Date(Math.min(derived, printed));
}
/** Pure live remaining time in minutes before the serve and safety buffers. */
export function remaining(donation, at = new Date(), weather = 'warm') {
  return (safeUntil(donation, weather).getTime() - config.serveBufferMin * ms - config.safetyMarginMin * ms - new Date(at).getTime()) / ms;
}
export function foodClock(donation, at = new Date(), weather = 'warm') {
  const remaining_minutes = remaining(donation, at, weather);
  return { safe_until: safeUntil(donation, weather).toISOString(), deadline: new Date(new Date(at).getTime() + remaining_minutes * ms).toISOString(), remaining_minutes: Math.max(0, remaining_minutes), urgent: remaining_minutes < 40, band: remaining_minutes > 90 ? 'green' : remaining_minutes >= 40 ? 'amber' : 'red', label: remaining_minutes <= 0 ? 'Food for Disposal' : undefined };
}
