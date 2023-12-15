import { type Request, type Response } from 'express';

class HealthCheck {
    path: string;

    constructor() {
        this.path = '/health';
    }

    static getHealth = (req: Request, res: Response): void => {
        res.status(200).json({ status: 'OK', message: 'passed successfully' });
    };
}

export default HealthCheck;
