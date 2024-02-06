import { type Document } from 'mongoose';
import Repository from '../../../lib/base/Repository';
import IMobile from '../entities/MobileInterface';
import MobileModel from './model';
import IBulkError from '../bulkUploadError/interface';
import BulkErrorDetail from '../bulkUploadError/schema';

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

    getAllMobiles = async (
        filter: any,
        fields: string,
        page: number,
        limit: number,
    ): Promise<IMobile[]> => {
        const skip = (page - 1) * limit;
        const mobiles = await this.model.find(filter).select(fields)
            .skip(skip)
            .limit(limit);
        return mobiles;
    };

    deleteMobileById = async (id: string): Promise<any> => {
        const deletedMobile = await this.model.deleteOne({ _id: id });
        return deletedMobile;
    };

    updateMobileById = async (id: string, updatedData: any): Promise<IMobile | null> => {
        const updatedMobile = await this.model.findOneAndUpdate(
            { _id: id },
            { $set: updatedData },
            { new: true },
        );
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

    static getAllErrorDetails = async (
        sessionId: string,
    ): Promise<IBulkError[] | Error | null> => {
        const result = await BulkErrorDetail.find({ session_id: sessionId });
        return result;
    };
}
export default MobileRepository;
