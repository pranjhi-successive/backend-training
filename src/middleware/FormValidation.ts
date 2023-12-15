import Joi from 'joi';
import { type Request, type Response, type NextFunction } from 'express';

// Middleware function for validating registration form
class ValidationMiddleware {
    path: string;

    constructor() {
        this.path = '/form';
    }

    static validateRegistration = (
        req: Request,
        res: Response,
        next: NextFunction,
    ): void => {
    // Define the validation schema using Joi
        const schema = Joi.object({
            username: Joi.string().alphanum().min(3).max(30)
                .required(),
            email: Joi.string().email().required(),
            password: Joi.string()
                .pattern(/^[a-zA-Z0-9]{3,30}$/)
                .required(),
        });

        // Validate the request body against the schema
        const { error } = schema.validate(req.body);
        if (error) {
            res
                .status(400)
                .json({ error: error.details.map((detail) => detail.message) });
            return;
        }
        next();
    };
}
export default ValidationMiddleware;
