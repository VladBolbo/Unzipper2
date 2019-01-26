import { App } from './app';
import * as dotenv from 'dotenv';

dotenv.config();

const app: App = new App();
const port: any = process.env.PORT || 3000;
const server = app.app;

server.listen(3000, () => {
    console.log(`Listening on port ${port}...`);
})