import { type Model, type Document } from 'mongoose';
import Repository from '../../../lib/base/Repository';
// import { MobileModel } from "./model/Mobile";
import { type Mobile } from '../entities/MobileInterface';

class MobileRepository extends Repository<Mobile> {
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
            // // console.error('Error creating mobile:', error);
            throw new Error('Error creating mobile');
        }
    }

    async getAllMobiles(): Promise<Array<Mobile & Document>> {
        try {
            const mobiles = await this.model.find({});
            return mobiles;
        } catch (error) {
            // // console.error('Error fetching mobiles:', error);
            throw new Error('Error fetching mobiles');
        }
    }

    async deleteMobileByBrand(brand: string): Promise<Mobile | null> {
        try {
            const deletedMobile = await this.model
                .findOneAndDelete({ brand })
                .lean()
                .exec();

            return deletedMobile ? (deletedMobile as Mobile) : null;
        } catch (error) {
            // // console.error('Error deleting mobile:', error);
            throw new Error('Error deleting mobile: ');
        }
    }

    async updateMobileByBrand(brand: string, updatedData: any): Promise<Mobile | null> {
        try {
            const updatedMobile = await this.model
                .findOneAndUpdate({ brand }, { $set: updatedData }, { new: true })
                .lean()
                .exec();
            return updatedMobile ? (updatedMobile as Mobile) : null;
        } catch (error) {
            throw new Error('Error updating mobile: ');
        }
    }

    async getMobilesByColor(color: string): Promise<Array<Mobile & Document>> {
        try {
            const mobiles = await this.model.find({ color });
            return mobiles;
        } catch (error) {
            throw new Error('Error getting mobiles by color');
        }
    }
}
export default MobileRepository;
