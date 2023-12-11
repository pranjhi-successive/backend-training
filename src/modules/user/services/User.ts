import { type IUser } from "../../../entities/UserInterface";
import type Repository from "../repository/User";
export class Services {
  private readonly repository: Repository;
  constructor(repository: Repository) {
    this.repository = repository;
  }

  async create(data: Partial<IUser>): Promise<IUser> {
    return await this.repository.create(data);
  }

  async getByName(name: string): Promise<IUser | null> {
    return await this.repository.findOne({ name });
  }

  async update(name: string, data: Partial<IUser>): Promise<void> {
    await this.repository.updateOne({ name }, data);
  }

  async deleteUser(name: string): Promise<void> {
    await this.repository.deleteOne({ name });
  }
}
