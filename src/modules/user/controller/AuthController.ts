// import { Express } from 'express';
import { Router, Request, Response } from 'express';
import Services from '../services/User';
import { generateToken } from '../../../middleware/AuthModule';

const authController = Router();
// const userServices = new Services();
authController.post('/signup', async (req:Request, res: Response):Promise<void> => {
    const { name, password } = req.body;
    try {
        const existingUser = await Services.findUserByUsername(name);
        if (existingUser) {
            res.status(400).json({ message: 'user exist already' });
            return;
        }
        const newUser = await Services.create(name, password);
        const token = generateToken(newUser._id);
        res.status(201).json({ token });
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({
            status: '500',
            message: ' Internal Server Error',
            time: new Date(),
        });
    }
});
authController.post('/login', async (req: Request, res: Response): Promise<void> => {
    const { name, password } = req.body;

    try {
        const user = await Services.findUserByUsername(name);
        if (!user) {
            res.status(401).json({ message: 'Invalid credentials' });
            return;
        }

        const passwordMatch = await Services.comparePasswords(password, user.password);
        if (!passwordMatch) {
            res.status(401).json({ message: 'Invalid credentials' });
            return;
        }

        const token = generateToken(user._id);
        res.status(200).json({ token });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({
            status: '500',
            message: ' Internal Server Error',
            time: new Date(),
        });
    }
});

export default authController;
