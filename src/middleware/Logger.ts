import {
    type Request,
    type Response,
    type NextFunction,
    Router,
} from 'express';
import logger from '../lib/logger';

class Logger {
    path: string;

    public router = Router();

    static readonly log = (
        req: Request,
        res: Response,
        next: NextFunction,
    ): void => {
        const timeStamp = new Date().toString();
        logger.info(`${timeStamp} ${req.method} ${req.url} ${req.ip}`);
        next();
    };

    constructor() {
        this.path = '/logger';
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.get(this.path, Logger.log, Logger.getTime);
    }

    static readonly getTime = (req: Request, res: Response): void => {
        res.status(200).json({
            status: 'OK',
            message: ' Time  is passed successfully',
            time: new Date().toString(),
        });
    };
}
export default Logger;
