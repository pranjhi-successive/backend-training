import Joi from 'joi';
import { type Request, type Response, type NextFunction } from 'express';

class SchemaValidation {
    path: string;

    constructor() {
        this.path = '/schema';
    }

    public userSchema = Joi.object({
        firstName: Joi.string().alphanum().min(3).max(30)
            .required(),
        lastName: Joi.string().alphanum().min(3).max(30)
            .required(),
        email: Joi.string().email().required(),
        password: Joi.string()
            .pattern(/^[a-zA-Z0-9]{3,30}$/)
            .required(),
    });

    // Validation middleware function
    static validateRequest = (schema: any) => (req: Request, res: Response, next: NextFunction)
    : void => {
        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            res.status(400).json({ error });
        }
        next();
    };
}
export default SchemaValidation;
