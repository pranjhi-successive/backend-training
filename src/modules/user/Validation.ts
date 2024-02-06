import Joi, { type ValidationResult } from 'joi';

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export default class Validation {
    static validate(data: any): ValidationResult {
        const schema = Joi.object({
            name: Joi.string().min(3).max(50).required(),
            phone: Joi.string().min(10).max(15).required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(6).required(),
            address: Joi.object({
                street: Joi.string().required(),
                city: Joi.string().required(),
                state: Joi.string().required(),
            }).required(),
        });

        return schema.validate(data);
    }
}
