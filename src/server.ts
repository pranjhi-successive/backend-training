import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import router from './routes/routes';
import Database from './lib/Database';
import { IServerConfig } from './config';

class Server {
    private readonly app: express.Application;

    private readonly database: Database;

    private readonly config: IServerConfig;

    constructor(config: IServerConfig) {
        this.config = config;
        this.app = express();
        this.database = new Database(this.config.mongoUrl);

        this.configureMiddleware();
        this.configureRoutes();
    }

    private configureMiddleware(): any {
        this.app.use(express.json());
        this.app.use(cors());
        this.app.use(morgan('dev'));
    }

    private configureRoutes(): any {
        this.app.use('/', router);
    }

    getApp() {
        return this.app;
    }

    disconnectDB = async (): Promise<void> => {
        await this.database.disconnect();
    };

    connectDB = async (): Promise<void> => {
        await this.database.connect();
    };

    static seed = async (): Promise<void> => {
        await Database.seedAll();
    };

    listen = async (): Promise<void> => {
        await this.connectDB();
        await Server.seed();

        this.app.listen(this.config.port, () => {
            // eslint-disable-next-line no-console
            console.log(`App listening on port ${this.config.port}`);
        });
    };
}

export default Server;
