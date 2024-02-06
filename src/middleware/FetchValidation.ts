import Joi from 'joi';
import { type Request, type Response, type NextFunction } from 'express';
import data2 from '../utils/data';

class Validation {
    userpath: string;

    postpath: string;

    constructor() {
        this.userpath = '/user';
        this.postpath = '/post';
    }

    static validationMiddlewareRequest = (
        req: Request,
        res: Response,
        next: NextFunction,
    ): any => {
        const route = req.path;
        const rules = data2[route];

        if (rules) {
            const { error } = Joi.object(rules).validate(req.body, {
                abortEarly: false,
            });

            if (error) {
                res.status(400).json({ error: error.details[0].message });
                return;
            }
        }

        next();
    };
}

export default Validation;
