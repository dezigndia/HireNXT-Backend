import dotenv from 'dotenv';
dotenv.config();

import { RestServer } from './server';
new RestServer().startServer(Number(process.env.PORT), process.env.ENV || 'development');