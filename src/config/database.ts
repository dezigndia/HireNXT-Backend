import {Pool} from 'pg';

export const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
    max: Number(process.env.MAX_POOL),
});

export const query = (text: string, params?: any[]) => pool.query(text, params);

