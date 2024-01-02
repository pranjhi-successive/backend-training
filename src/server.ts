import express from 'express';
// eslint-disable-next-line import/no-extraneous-dependencies
import cors from 'cors';
import morgan from 'morgan';
import router from './routes/Route';
import Database from './lib/Database';

interface ServerConfig {
  port: number;
  host: string;
  secretKey: string;
  customHeaderName: string;
  customHeaderValue: string;
  mongoUrl: string;
}
class Server {
    private readonly app: express.Application;

    private readonly database: Database;

    private readonly config: ServerConfig;

    constructor(config: ServerConfig) {
        // // // // console.log(config);
        this.config = config;
        this.app = express();
        this.database = new Database();

        this.configureMiddleware();
        this.configureRoutes();

    //  await  database.connect();
    }

    private configureMiddleware(): any {
        this.app.use(express.json());
        this.app.use(cors());
        this.app.use(morgan('dev'));
    }

    private configureRoutes(): any {
        this.app.use('/', router);
    }

    run = async (): Promise<void> => {
        await this.database.connect();
    // await database.seed();
    // console.log(database.seed());
    };

    public listen(): any {
        this.app.listen(this.config.port, () => {
            // eslint-disable-next-line no-console
            console.log(`App listening on port ${this.config.port}`);
        });
    }
}

export default Server;
