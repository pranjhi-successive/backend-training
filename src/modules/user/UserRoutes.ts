import { Router, Request, Response } from 'express';
import Controller from './controller/User';
import Services from './services/User';
import Repository from './repository/User';
import userModel from '../../models/User';

const userRouter = Router();
const userRepository = new Repository(userModel);
const userService = new Services(userRepository);
// const userController = new Controller(userService);
userRouter.post('/create', async (req: Request, res: Response) => {
    try {
        await Controller.create(req, res);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

userRouter.get('/:name', async (req: Request, res: Response) => {
    try {
        await Controller.getByName(req, res);
    } catch (error) {
        console.error('Error getting user by name:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
userRouter.get('/all', async (req: Request, res: Response) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error getting all users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default userRouter;
