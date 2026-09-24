import bcrypt from 'bcryptjs'; import app from './app.js'; import { config } from './config.js'; import { startScheduler } from './scheduler.js'; import { connectDB, closeDB } from './db/index.js'; import { users } from './db/repos/users.js';
async function start() {
  if(process.env.NODE_ENV==='production'&&(!process.env.JWT_SECRET||process.env.JWT_SECRET.length<32))throw new Error('Production requires a random JWT_SECRET of at least 32 characters.');
  await connectDB();
  if(process.env.ADMIN_EMAIL||process.env.ADMIN_PASSWORD){const email=process.env.ADMIN_EMAIL?.trim().toLowerCase(),password=process.env.ADMIN_PASSWORD;if(!email||!password||password.length<12)throw new Error('Set both ADMIN_EMAIL and ADMIN_PASSWORD (minimum 12 characters) to bootstrap an admin.');if(!(await users.byEmail(email)))await users.create({role:'admin',email,password_hash:await bcrypt.hash(password,12),org_id:null,name:'Administrator',phone:null,created_at:new Date().toISOString()});}
  const server=app.listen(config.port,()=>console.log(`Surplus-to-Shelter API listening on http://localhost:${config.port}`)); const scheduler=startScheduler();
  for(const signal of ['SIGINT','SIGTERM'])process.on(signal,()=>{clearInterval(scheduler);server.close(async()=>{await closeDB();process.exit(0);});});
}

start().catch(async (error) => {
  console.error(`[FATAL] ${error instanceof Error ? error.message : String(error)}`);
  await closeDB().catch(() => undefined);
  process.exitCode = 1;
});
