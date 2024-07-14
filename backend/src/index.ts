import dotenv from 'dotenv'
import { app } from './app';
dotenv.config()
import { pool } from './repository/db.connection';
import { pgRepository } from './repository/pg.repo';


const start = async () => {
    console.log('starting up');
    try {
        if(!process.env.PG_USER) throw new Error('PG_USER must be defiend');
        if(!process.env.PG_HOST) throw new Error('PG_HOST must be defiend');
        if(!process.env.PG_DATABASE) throw new Error('PG_DATABASE must be defiend');
        if(!process.env.PG_PASSWORD) throw new Error('PG_PASSWORD must be defiend');

        await pgRepository.connect();
        app.listen(4000, () => {
            console.log('listening on port 4000');
        });
    } catch (e) {
        console.error(e)
    }
}


start();