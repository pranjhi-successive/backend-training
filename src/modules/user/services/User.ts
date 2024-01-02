import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { type IUser } from '../entities/UserInterface';
import type Repository from '../repository/User';
import { IDecodedToken } from '../entities/AuthInterface';
import userModel from '../repository/model/user';

class Services {
    private readonly repository: Repository;

    constructor(repository: Repository) {
        this.repository = repository;
    }

    static create = async (userData :IUser) :Promise<any> => {
        const salt: string = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(userData.password, salt);
        // console.log('new user ', userData.password);
        const user = await userModel.create({ ...userData, password: hashedPassword });
        return user;
    };

    // eslint-disable-next-line max-len
    static findUserByUsername = async (name: string): Promise<IUser | null> => userModel.findOne({ name });

    update = async (name: string, data: Partial<IUser>): Promise<void> => {
        const result = await this.repository.updateOne({ name }, data);
        return result;
    };

    getAllUsers = async (): Promise<IUser[]> => {
        const result = await this.repository.find({});
        return result;
    };

    deleteUser = async (name: string): Promise<void> => {
        const result = await this.repository.deleteOne({ name });
        return result;
    };

    // eslint-disable-next-line max-len
    static comparePasswords = async (candidatePassword: string, hashedPassword: string) => bcrypt.compare(candidatePassword, hashedPassword);

    static generateToken = (userId: string): string => jwt.sign({ userId }, 'hello', { expiresIn: '1h' });

    static verifyToken = (token: string): IDecodedToken => jwt.verify(token, 'hello') as IDecodedToken;

    static authenticateUser = (req: any, res: any, next: any): void => {
        const token: string = req.header('Authorization');

        if (!token) {
            res.status(401).json({ status: '401', message: 'Unauthorized', time: new Date() });
            return;
        }
        const decoded: IDecodedToken = Services.verifyToken(token);
        req.userId = decoded.userId;
        next();
    };
}
export default Services;
