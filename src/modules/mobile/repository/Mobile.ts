import { type Model, type Document } from "mongoose";
import Repository from "../../../lib/base/Repository";
// import { MobileModel } from "./model/Mobile";
import { type Mobile } from "../../../entities/MobileInterface";

export class MobileRepository extends Repository<Mobile> {
  protected readonly additionalProperty: string;

  constructor(model: Model<Mobile & Document>, additionalProperty: string) {
    super(model);
    this.additionalProperty = additionalProperty;
  }

  async createMobile(data: any): Promise<Mobile & Document> {
    try {
      const newMobile = await this.model.create(data);
      return newMobile;
    } catch (error) {
      console.error("Error creating mobile:", error);
      throw new Error("Error creating mobile");
    }
  }

  async getAllMobiles(): Promise<Array<Mobile & Document>> {
    try {
      const mobiles = await this.model.find({});
      return mobiles;
    } catch (error) {
      console.error("Error fetching mobiles:", error);
      throw new Error("Error fetching mobiles");
    }
  }
}
