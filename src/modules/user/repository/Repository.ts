import { type FilterQuery, type UpdateQuery } from 'mongoose';
import { type IUser } from '../entities/UserInterface';
import userModel from './model';
import Repository from '../../../lib/base/Repository';

class UserRepository extends Repository<IUser> {
    constructor() {
        super(userModel);
    }

    updateOne = async (
        conditions: FilterQuery<IUser>,
        update: UpdateQuery<IUser>,
    ): Promise<void> => {
        await this.updateOne(conditions, update);
    };

    deleteOne = async (conditions: FilterQuery<IUser>): Promise<any> => {
        const result = await this.model.deleteOne(conditions);
        return result;
    };

    find = async (conditions: FilterQuery<IUser>): Promise<IUser[]> => {
        const result = await this.model.find(conditions);
        return result;
    };
}
export default UserRepository;
