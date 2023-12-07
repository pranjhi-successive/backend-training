import {
  type Model,
  type Document,
  type FilterQuery,
  type UpdateQuery,
} from "mongoose";

export default class Repository<T extends Document> {
  private readonly model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  async findOne(conditions: FilterQuery<T>): Promise<T | null> {
    return await this.model.findOne(conditions).exec();
  }

  async updateOne(
    conditions: FilterQuery<T>,
    update: UpdateQuery<T>,
  ): Promise<void> {
    await this.model.updateOne(conditions, update).exec();
  }
}
