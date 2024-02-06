import Joi, { ObjectSchema, ValidationResult } from 'joi';
import { NextFunction, Request, Response } from 'express';
import logger from '../../lib/logger';

export const mobileJoiSchema = Joi.object({
    brand: Joi.string().required(),
    modelNumber: Joi.string().required(),
    price: Joi.number().required(),
    color: Joi.string().required(),

    specifications: Joi.object({
        display: Joi.string().required(),
        camera: Joi.string().required(),
        processor: Joi.string().required(),
        storage: Joi.string().required(),
    }).required(),

    releaseDate: Joi.date().required(),
    batteryCapacity: Joi.string().required(),
    connectivity: Joi.object({
        wifi: Joi.boolean(),
        bluetooth: Joi.boolean(),
        cellular: Joi.boolean(),
    }),

    weight: Joi.number(),
    operatingSystem: Joi.string().required(),
    isWaterResistant: Joi.boolean(),
    additionalFeatures: Joi.array().items(Joi.string()),

    accessories: Joi.array().items(Joi.object({
        name: Joi.string().required(),
        type: Joi.string(),
        price: Joi.number(),
    })),

    warranty: Joi.object({
        validUntil: Joi.date(),
        type: Joi.string(),
    }),

    image: Joi.string().required(),
    createdBy: Joi.string().hex().length(24),
    updatedBy: Joi.string().hex().length(24),
});
class Validation {
    static validate = (
        res: Response,
        next: NextFunction,
        validator: ObjectSchema<any>,
        value: any,
    ) => {
        try {
            const validationResult: ValidationResult<any> = validator.validate(
                value,
                { abortEarly: false },
            );
            if (validationResult.error) {
                res.status(400).json({
                    status: 'error',
                    message: 'validation error',
                    time: new Date(),
                    error: validationResult.error,
                });
                return;
            }
            logger.info(' validated success!', value);
            next();
        } catch (error: unknown) {
            logger.error(error);
            res.status(500).json({
                status: 'error',
                message: 'internal server  error',
                time: new Date(),
                error,
            });
        }
    };

    static create = async (req: Request, res: Response, next:NextFunction): Promise<void> => {
        Validation.validate(res, next, mobileJoiSchema, req.body);
    };
}
export default Validation;
