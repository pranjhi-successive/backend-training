import {
  type Model,
  type Document,
  type FilterQuery,
  type UpdateQuery,
} from "mongoose";

export default class Repository<T extends Document> {
  async create(data: Partial<T>): Promise<T> {
    if (!data) {
      throw new Error("Empty object provided");
    }

    const newDocument = await this.model.create(data);

    return newDocument;
  }

  private readonly model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  async findOne(conditions: FilterQuery<T>): Promise<T | null> {
    return await this.model.findOne(conditions).exec();
  }

  async findAll(conditions: FilterQuery<T> = {}): Promise<T[]> {
    return await this.model.find(conditions).exec();
  }

  async updateOne(
    conditions: FilterQuery<T>,
    update: UpdateQuery<T>,
  ): Promise<void> {
    await this.model.updateOne(conditions, update).exec();
  }

  async deleteOne(conditions: FilterQuery<T>): Promise<void> {
    await this.model.deleteOne(conditions).exec();
  }
}
