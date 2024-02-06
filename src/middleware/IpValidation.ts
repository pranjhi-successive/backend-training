import { type Request, type Response, type NextFunction } from 'express';
import logger from '../lib/logger';

class IpVerification {
    path: string;

    constructor() {
        this.path = '/ip';
    }

    static ipCheckMiddleware = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        const expectedIp = '::1';

        try {
            const clientIp = req.ip;

            if (clientIp !== expectedIp) {
                res.status(403).send({
                    status: false,
                    message: 'Forbidden: Access denied. Invalid IP address.',
                });
                return;
            }

            logger.info('Valid Ip address!');
            next();
        } catch (error) {
            logger.info(error);
            res.status(500).send({
                status: false,
                message: 'Internal Server Error',
            });
        }
    };
}

export default IpVerification;
