import { config } from './config.js';
let offsetSeconds = 0; let speed = config.simSpeed; let startedAt = Date.now();
/** Simulated UTC time; speed 60 means one real second advances one simulated minute. */
export function now() { return new Date(Date.now() + offsetSeconds * 1000 + (Date.now() - startedAt) * (speed - 1)); }
export function setClock({ nextSpeed = speed, offset = offsetSeconds } = {}) { speed = nextSpeed; offsetSeconds = offset; startedAt = Date.now(); }
export function advanceClock(seconds) { offsetSeconds += seconds; }
export function getClockState() { return { speed, offset_seconds: offsetSeconds, now: now().toISOString() }; }
