import { type Model, type FilterQuery, type UpdateQuery } from 'mongoose';
import { type IUser } from '../entities/UserInterface';

export default class Repository {
    private readonly userModel: Model<IUser>;

    constructor(userModel: Model<IUser>) {
        this.userModel = userModel;
    }

    async create(data: Partial<IUser>): Promise<IUser> {
        if (!data) {
            throw new Error('empty object provided');
        }
        const result = await this.userModel.create(data);
        return result;
    }

    async findOne(conditions: FilterQuery<IUser>): Promise<IUser | null> {
        const result = await this.userModel.findOne(conditions).exec();
        return result;
    }

    async updateOne(
        conditions: FilterQuery<IUser>,
        update: UpdateQuery<IUser>,
    ): Promise<void> {
        await this.userModel.updateOne(conditions, update).exec();
    }

    async deleteOne(conditions: FilterQuery<IUser>): Promise<void> {
        await this.userModel.deleteOne(conditions).exec();
    }

    async find(conditions: FilterQuery<IUser>): Promise<IUser[]> {
        const result = await this.userModel.find(conditions).exec();
        return result;
    }
}
