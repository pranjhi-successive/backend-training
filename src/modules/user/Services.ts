import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { type IUser } from './entities/UserInterface';
import { IDecodedToken } from './entities/AuthInterface';
import UserRepository from './repository/Repository';

class UserServices {
    private readonly repository: UserRepository;

    constructor() {
        this.repository = new UserRepository();
    }

    static generateHashedPassword = async (password: string): Promise<string> => {
        const salt: string = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    };

    create = async (userData :IUser) :Promise<any> => {
        const salt: string = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(userData.password, salt);
        const user = await this.repository.create({ ...userData, password: hashedPassword });
        return user;
    };

    // eslint-disable-next-line max-len
    findUserByEmail = async (email: string): Promise<IUser | null> => {
        const result = await this.repository.findOne({ email });
        return result;
    };

    update = async (name: string, data: Partial<IUser>): Promise<void> => {
        const result = await this.repository.updateOne({ name }, data);
        return result;
    };

    getAllUsers = async (): Promise<IUser[]> => {
        const result = await this.repository.find({});
        return result;
    };

    deleteUser = async (email: string): Promise<any> => {
        const result = await this.repository.deleteOne({ email });
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
        const decoded: IDecodedToken = UserServices.verifyToken(token);
        req.userId = decoded.userId;
        next();
    };

    deleteAll = async (): Promise<void> => {
        await this.repository.deleteAll();
    };

    getById = async (userId: string): Promise<IUser | null> => {
        const result = await this.repository.getById(userId);
        return result;
    };
}
export default UserServices;
