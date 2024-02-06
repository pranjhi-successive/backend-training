import { type Request, type Response } from 'express';
import UserServices from './Services';
import Validation from './Validation';
import logger from '../../lib/logger';
import { IUser } from './entities/UserInterface';

class Controller {
    private readonly services: UserServices;

    constructor() {
        this.services = new UserServices();
    }

    create = async (req: Request, res: Response): Promise<void> => {
        const userData = req.body;
        const validationResult = Validation.validate(userData);

        if (validationResult.error) {
            res.status(400).json({
                status: '400', message: 'validation error', time: new Date(), error: validationResult.error.details[0].message,
            });
            return;
        }
        try {
            const result = await this.services.create(userData);
            res.status(200).json({
                status: 'success',
                message: 'Data added successfully',
                data: result,
                time: new Date(),
            });
        } catch (error) {
            logger.error('Error creating user:', error);
            res.status(500).json({
                status: 'error',
                time: new Date(),
                error: 'Internal Server Error',
            });
        }
    };

    getAll = async (req: Request, res: Response) => {
        try {
            const users = await this.services.getAllUsers();
            res.status(200).json({
                status: 'success',
                data: users,
                time: new Date(),
            });
        } catch (error : any) {
            logger.error('Error getting all users:', error);
            res.status(500).json({
                status: 'error',
                message: 'Internal Server Error',
                time: new Date(),
                error: error.message,
            });
        }
    };

    getByEmail = async (req: Request, res: Response): Promise<void> => {
        const { email } = req.params;

        try {
            const user = await this.services.findUserByEmail(email);
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
            logger.error('Error getting user by name:', error);
            res.status(500).json({
                status: 'error',
                time: new Date(),
                message: 'Internal Server Error',
                error: error.message,
            });
        }
    };

    delete = async (req: Request, res: Response): Promise<any> => {
        const { email } = req.params;

        try {
            const deleted = await this.services.deleteUser(email);

            if (deleted.deletedCount > 0) {
                res.status(200).json({
                    status: 'success',
                    data: deleted,
                    time: new Date(),
                });
            } else {
                logger.error('error', Error);
                res
                    .status(404)
                    .json({
                        status: 'not found',
                        message: 'User not found',
                    });
            }
        } catch (error: any) {
            logger.error('Error deleting mobile:', error);
            res.status(500).json({
                status: 'error',
                message: 'Internal Server Error',
                time: new Date(),
                error: error.message,
            });
        }
    };

    signup = async (req:Request, res: Response):Promise<void> => {
        try {
            const existingUser = await this.services.findUserByEmail(req.body.email);
            if (existingUser) {
                res.status(400).json({ status: '400', message: 'user exist already', time: new Date() });
                return;
            }
            const newUser = await this.services.create(req.body);
            // eslint-disable-next-line no-underscore-dangle
            const token = UserServices.generateToken(newUser._id);
            res.status(200).json({
                status: '200', message: 'user created', token, user: newUser, time: new Date(),
            });
        } catch (error) {
            logger.error('Error during signup:', error);
            res.status(500).json({
                status: '500',
                message: ' Internal Server Error',
                time: new Date(),
            });
        }
    };

    login = async (req: Request, res: Response): Promise<void> => {
        const { email, password } = req.body;

        try {
            const user: IUser | null = await this.services.findUserByEmail(email);
            logger.info('user found', user);
            if (!user) {
                res.status(401).json({ status: false, message: 'Invalid credentials1' });
                return;
            }

            const passwordMatch = await UserServices.comparePasswords(password, user.password);
            if (!passwordMatch) {
                res.status(500).json({
                    status: 'error',
                    message: 'Invalid credentials',
                    time: new Date(),
                });
                return;
            }
            // eslint-disable-next-line no-underscore-dangle
            const token = UserServices.generateToken((user as any)._id);
            res.status(200).json({
                status: '200', message: 'login successfull', data: user, token,
            });
        } catch (error:any) {
            logger.error('Error during login:', error);
            res.status(500).json({
                status: '500',
                message: ' Internal Server Error',
                time: new Date(),
                error: error.message,
            });
        }
    };

    getToken = async (req: Request, res: Response): Promise<void> => {
        try {
            const { userId } = req.body;
            const user = await this.services.getById(userId);

            if (!user) {
                res.status(401).json({ status: false, message: 'User not found' });
                return;
            }
            res.status(200).json({
                status: 'success',
                message: 'successfull',
                data: user,
                time: new Date(),
            });
        } catch (error:any) {
            logger.error('Error during login:', error);
            res.status(500).json({
                status: '500',
                message: ' Internal Server Error',
                time: new Date(),
                error: error.message,
            });
        }
    };
}

export default Controller;
