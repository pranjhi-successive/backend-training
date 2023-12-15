import bcrypt from 'bcrypt';
import { type IUser } from '../../../entities/UserInterface';
import userModel from '../../../models/User';
import type Repository from '../repository/User';

class Services {
    private readonly repository: Repository;

    constructor(repository: Repository) {
        this.repository = repository;
    }

    static async create(name: string, password: string) :Promise<any> {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await userModel.create({ name, password: hashedPassword });
        return user;
    }

    static async findUserByUsername(name: string): Promise<IUser | null> {
        return userModel.findOne({ name });
    }

    async update(name: string, data: Partial<IUser>): Promise<void> {
        const result = await this.repository.updateOne({ name }, data);
        return result;
    }

    async getAllUsers(): Promise<IUser[]> {
        const result = await this.repository.find({});
        return result;
    }

    async deleteUser(name: string): Promise<void> {
        const result = await this.repository.deleteOne({ name });
        return result;
    }

    static async comparePasswords(candidatePassword: string, hashedPassword: string) {
        return bcrypt.compare(candidatePassword, hashedPassword);
    }
}
export default Services;
