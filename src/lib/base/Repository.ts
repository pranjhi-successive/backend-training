import {
    type Model,
    type Document,
    type FilterQuery,
    type UpdateQuery,
} from 'mongoose';

export default class Repository<T extends Document> {
    public readonly model: Model<T>;

    constructor(model: Model<T>) {
        this.model = model;
    }

    async findOne(conditions: FilterQuery<T>): Promise<T | null> {
        const result = await this.model.findOne(conditions).exec();
        return result;
    }

    async updateOne(
        conditions: FilterQuery<T>,
        update: UpdateQuery<T>,
    ): Promise<void> {
        await this.model.updateOne(conditions, update).exec();
    }

    async create(data: Partial<T>): Promise<T> {
        const result = await this.model.create(data);
        return result;
    }

    async findAll(conditions: FilterQuery<T> = {}): Promise<T[]> {
        const result = await this.model.find(conditions).exec();
        return result;
    }
}
