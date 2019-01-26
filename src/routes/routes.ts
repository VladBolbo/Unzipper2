import { Request, Response } from 'express';
import * as express from 'express';

export class Routes {

    public routes(app: express.Application): void {
        app.get('/', async (req: Request, res: Response) => {
            res.render('index');
        })
    }
}