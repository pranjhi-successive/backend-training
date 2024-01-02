import { type Document } from 'mongoose';
import Repository from '../../../lib/base/Repository';
import IMobile from '../entities/MobileInterface';
import MobileModel from './model/Mobile';

class MobileRepository extends Repository<IMobile> {
    constructor() {
        super(MobileModel);
    }

    createMobile = async (data: any): Promise<IMobile & Document> => {
        const newMobile = await this.model.create(data);
        return newMobile;
    };

    getModelNumber = async (data:any): Promise<any> => {
        const mobile = await this.model.find({ modelNumber: data });
        return mobile;
    };

    getAllMobiles = async (): Promise<IMobile[]> => {
        const mobiles = await this.model.find({});
        return mobiles;
    };

    deleteMobileByBrand = async (brand: string): Promise<IMobile | null> => {
        const deletedMobile = await this.model
            .findOneAndDelete({ brand })
            .lean()
            .exec();
        return deletedMobile ? (deletedMobile as IMobile) : null;
    };

    updateMobileByBrand = async (brand: string, updatedData: any): Promise<IMobile | null> => {
        const updatedMobile = await this.model
            .findOneAndUpdate({ brand }, { $set: updatedData }, { new: true })
            .lean()
            .exec();
        return updatedMobile ? (updatedMobile as IMobile) : null;
    };

    getMobilesByColor = async (color: string): Promise<Array<IMobile & Document>> => {
        const mobiles = await this.model.find({ color });
        return mobiles;
    };

    getAllMobilesPaginated = async (skip: number, limit: number): Promise<IMobile[]> => {
        const mobiles = await this.model.find({}).skip(skip).limit(limit);
        return mobiles;
    };

    getTotalMobiles = async (): Promise<number> => {
        const totalMobiles = await this.model.countDocuments({});
        return totalMobiles;
    };
}
export default MobileRepository;
