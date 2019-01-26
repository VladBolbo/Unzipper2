import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { Routes } from './routes/routes';

dotenv.config();

export class App {
    public app: express.Application;
    public router: Routes =  new Routes();

    constructor() {
        this.app = express();
        this.config();
        this.router.routes(this.app);
        this.configDatabase();
    }

    private config(): void {
        this.app.set('views', path.join(__dirname, 'views'));
        this.app.set('view engine','pug');
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }

    public configDatabase() {
        //use promise db
        (<any>mongoose).Promise = global.Promise;
        mongoose.connect(<string>process.env.DB_MONGO, { useNewUrlParser: true }, err => {
            if (err) {
                throw new Error(err.message);
            }
            console.log('Connected to MongoDB...')
        });
    }
}