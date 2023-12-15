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
        const validationResult = Validation.create(userData);
        if (validationResult.error) {
            res.status(400).json({ error: validationResult.error.details[0].message });
            return;
        }
        const { name, password } = userData;
        try {
            const a = await Services.create(name, password);
            res.status(200).json({ message: 'Data added Successfully', data: a });
        } catch (error) {
            console.error('Error creating user:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    static async getByName(req: Request, res: Response): Promise<void> {
        const { name } = req.params;

        try {
            const user = await Services.findUserByUsername(name);
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            // console.error('Error getting user by name:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}
export default Controller;
