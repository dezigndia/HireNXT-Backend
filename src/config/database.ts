import {Pool} from 'pg';

export const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
    max: Number(process.env.MAX_POOL),
});

export const selectQuery = async (text: string, params?: any[]) => pool.query(text,params);

export const query = async (text: string, params?: any[]) => {
    try{
        //const client = await pool.connect();    
        const res = pool.query(text,params);
        return res;
    }
    catch(err){
        console.error('Error connecting to the database:', err);
        return "";
    }

};



