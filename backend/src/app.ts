import express from 'express'
import 'express-async-errors'
import { usersRouter } from './routes/users.route';
import { NotFoundError } from './errors/not-found.error';
import { errorHanlder } from './middlewares/error.middleware';
import cors  from 'cors';
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

app.use('/api/users', usersRouter);
app.all('*', async () => { 
    console.log('404');
    throw new NotFoundError();    
 });

// error handling
app.use(errorHanlder);
export { app }