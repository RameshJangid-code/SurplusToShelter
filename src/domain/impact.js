import { config } from '../config.js';
export function impactFor(qty) { const kg = qty * config.impact.kgPerPlate; return { meals: qty, kg, co2e_kg: kg * config.impact.co2eKgPerKg, water_l: kg * config.impact.waterLPerKg }; }
export function forecast(history, weeks = 6) { const values = history.slice(-weeks).map(x => Number(x.qty_plates || 0)); return { expected_surplus: values.length ? values.reduce((a,b)=>a+b,0)/values.length : 0, confidence: values.length >= 4 ? 'high' : values.length >= 2 ? 'medium' : 'low', samples: values.length }; }
