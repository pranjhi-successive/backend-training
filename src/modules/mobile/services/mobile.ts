import { type Mobile } from "../../../entities/MobileInterface";
import mobileData from "../../../utils/mobile";
import { type MobileRepository } from "../repository/Mobile";
import { MobileModel } from "../repository/model/Mobile";

export class MobileService {
  private readonly repository: MobileRepository;

  constructor(repository: MobileRepository) {
    this.repository = repository;
  }

  async seedData(): Promise<void> {
    try {
      await MobileModel.insertMany(mobileData);
    } catch (error) {
      console.error("Error", error);
      throw error;
    }
  }

  async createMobile(data: any): Promise<Mobile> {
    try {
      const newMobile = await this.repository.createMobile(data);
      return newMobile;
    } catch (error) {
      throw new Error(`Error creating mobile: `);
    }
  }

  // async getAllMobiles(): Promise<Mobile[]> {
  //   // Return the data from the imported mobileData array
  //   const mobile = mobileData;
  //   // return mobile;
  // }

  async getMobileById(id: string): Promise<Mobile | null> {
    try {
      const mobile = await this.repository.findOne({ _id: id });
      return mobile;
    } catch (error) {
      throw new Error(`Error getting mobile by ID`);
    }
  }
}
