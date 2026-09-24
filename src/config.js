import 'dotenv/config';

// Demo defaults only; food safety values require validation against FSSAI/local guidance before real use.
export const config = {
  port: Number(process.env.PORT || 3000), mongoUri: process.env.MONGODB_URI || '', mongoDbName: process.env.MONGODB_DB_NAME || 'surplus_to_shelter',
  jwtSecret: process.env.JWT_SECRET || 'local-development-secret-change-me', jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  demoMode: process.env.DEMO_MODE === 'true', simSpeed: Number(process.env.SIM_SPEED || 1), weather: process.env.WEATHER || 'warm',
  serveBufferMin: Number(process.env.SERVE_BUFFER_MIN || 30), safetyMarginMin: Number(process.env.SAFETY_MARGIN_MIN || 10),
  foodWindows: { cooked_veg: { hot: 120, warm: 180, cool: 240 }, cooked_nonveg: { hot: 120, warm: 180, cool: 240 }, packed: { hot: 1440, warm: 1440, cool: 1440 }, bakery: { hot: 720, warm: 720, cool: 720 } },
  travelMinPerKm: Number(process.env.TRAVEL_MIN_PER_KM || 3), travelFixedMin: Number(process.env.TRAVEL_FIXED_MIN || 4),
  scoreWeights: { proximity: 0.4, need: 0.3, fairness: 0.2, reliability: 0.1 }, batchWindowSeconds: 20,
  impact: { kgPerPlate: Number(process.env.KG_PER_PLATE || 0.35), co2eKgPerKg: Number(process.env.CO2E_KG_PER_KG || 2.65), waterLPerKg: Number(process.env.WATER_L_PER_KG || 810) },
  dispatch: { radiusKm: [3, 6, 10], radiusIntervalMs: 120000, topN: 5, weights: [-1, 2, 1.5, 1, 0.5] },
  telegramToken: process.env.TELEGRAM_BOT_TOKEN, telegramChatId: process.env.TELEGRAM_CHAT_ID
};
