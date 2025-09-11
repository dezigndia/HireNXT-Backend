import dotenv from 'dotenv';
dotenv.config();

import { RestServer } from './server';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

if (!port && isNaN(port)) {
  console.error("❌ Invalid port number! Falling back to 3000.");
}

new RestServer().startServer(3000, process.env.ENV || 'development');
