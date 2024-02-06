import {
    type Model,
    type FilterQuery,
    type UpdateQuery,
} from 'mongoose';
import IBase from './interface';

export default class Repository<T extends IBase> {
    public readonly model: Model<T>;

    constructor(model: Model<T>) {
        this.model = model;
    }

    findOne = async (conditions: FilterQuery<T>): Promise<T | null> => {
        const result = await this.model.findOne(conditions).exec();
        return result;
    };

    getById = async (id: string): Promise<T | null> => {
        const result: T | null = await this.model.findById(id);
        return result;
    };

    updateOne = async (
        conditions: FilterQuery<T>,
        update: UpdateQuery<T>,
    ): Promise<void> => {
        await this.model.updateOne(conditions, update).exec();
    };

    create = async (data: Partial<T>): Promise<T> => {
        const result = await this.model.create(data);
        return result;
    };

    deleteAll = async () => {
        await this.model.deleteMany();
    };

    countDocuments = async (filters: FilterQuery<T>): Promise<number> => {
        const result: number = await this.model.countDocuments(filters);
        return result;
    };
}
