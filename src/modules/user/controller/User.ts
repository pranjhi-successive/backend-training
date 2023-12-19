import { type Request, type Response } from 'express';
import Services from '../services/User';
import Validation from '../Validation';

class Controller {
    private readonly services: Services;

    constructor(services: Services) {
        this.services = services;
    }

    static async create(req: Request, res: Response): Promise<void> {
        const userData = req.body;
        // // console.log(userData);
        const validationResult = Validation.validate(userData);

        // // console.log('reached here');
        if (validationResult.error) {
            res.status(400).json({
                status: '400', message: 'validation error', time: new Date(), error: validationResult.error.details[0].message,
            });
            return;
        }
        // const { name, password } = userData;
        try {
            const result = await Services.create(userData);
            res.status(200).json({
                status: 'success',
                message: 'Data added successfully',
                data: result,
                time: new Date(),
            });
        } catch (error) {
            // console.error('Error creating user:', error);
            res.status(500).json({
                status: 'error',
                time: new Date(),
                error: 'Internal Server Error',
            });
        }
    }

    static async getByName(req: Request, res: Response): Promise<void> {
        const { name } = req.params;

        try {
            const user = await Services.findUserByUsername(name);
            if (user) {
                res.status(200).json({
                    status: 'success',
                    message: 'successfull',
                    data: user,
                    time: new Date(),
                });
            } else {
                res.status(404).json({ status: 'error', message: 'User not found', time: new Date() });
            }
        } catch (error:any) {
            // // console.error('Error getting user by name:', error);
            res.status(500).json({
                status: 'error',
                time: new Date(),
                message: 'Internal Server Error',
                error: error.message,
            });
        }
    }
}
export default Controller;
