import { Request, Response, NextFunction } from 'express';

const validateAge = (req: Request, res: Response, next: NextFunction): void => {
    const age = req.query.age as string;

    if (!age) {
        res.status(400).json({
            status: 'error',
            message: 'Age  is required.',
            time: new Date(),
        });
    } else {
        const ageNumber = parseInt(age, 10);

        if (Number.isNaN(ageNumber) || !Number.isInteger(ageNumber)) {
            res.status(400).json({
                status: 'error',
                message: 'Age must be a valid number ',
                time: new Date(),
            });
        } else {
            next();
        }
    }
};

export default validateAge;
