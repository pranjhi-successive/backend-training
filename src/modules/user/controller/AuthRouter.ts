/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
// import { Express } from 'express';
import { Router, Request, Response } from 'express';
import Services from '../services/User';
// import { generateToken } from '../services/AuthModule';

const authRouter = Router();
// const userServices = new Services();
authRouter.post('/signup', async (req:Request, res: Response):Promise<void> => {
    // const { name, password } = req.body;
    try {
        const existingUser = await Services.findUserByUsername(req.body.name);
        if (existingUser) {
            res.status(400).json({ status: '400', message: 'user exist already', time: new Date() });
            return;
        }
        const newUser = await Services.create(req.body);
        const token = Services.generateToken(newUser._id);
        res.status(200).json({
            status: '200', message: 'user created', token, newUser, time: new Date(),
        });
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({
            status: '500',
            message: ' Internal Server Error',
            time: new Date(),
        });
    }
});
authRouter.post('/login', async (req: Request, res: Response): Promise<void> => {
    const { name, password } = req.body;

    try {
        const user = await Services.findUserByUsername(name);
        if (!user) {
            res.status(401).json({ message: 'Invalid credentials1' });
            return;
        }

        const passwordMatch = await Services.comparePasswords(password, user.password);
        if (!passwordMatch) {
            res.status(500).json({
                status: 'error',
                message: 'Invalid credentials',
                time: new Date(),
            });
            return;
        }

        const token = Services.generateToken(user._id);
        res.status(200).json({
            status: '200', message: 'login successfull', data: user, token,
        });
    } catch (error:any) {
        console.error('Error during login:', error);
        res.status(500).json({
            status: '500',
            message: ' Internal Server Error',
            time: new Date(),
            error: error.message,
        });
    }
});

export default authRouter;
