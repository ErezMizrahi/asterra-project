import { Pool } from 'pg';
import { User } from '../types/user';

class PGRepository {
    private _pool?: Pool;

    get pool() {
        if (!this._pool) throw new Error('Cannot access pg pool before connecting!');
        return this._pool;
    }

    async connect() {
        this._pool = new Pool({
            user: process.env.PG_USER,
            host: process.env.PG_HOST,
            database: process.env.PG_DATABASE,
            password: process.env.PG_PASSWORD,
            port: 5432,
            ssl: {
                rejectUnauthorized: false
            }
        });

        try {
            const client = await this._pool.connect();
            client.release();
        } catch (err) {
            console.error('Error connecting to the database', err);
            throw err;
        }
    }


}

export const pgRepository = new PGRepository();
