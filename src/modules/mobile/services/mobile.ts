import { type Mobile } from '../../../entities/MobileInterface';
import mobileData from '../../../utils/mobile';
import MobileRepository from '../repository/Mobile';
import MobileModel from '../repository/model/Mobile';

class MobileService {
    private readonly repository: MobileRepository;

    constructor(repository: MobileRepository) {
        this.repository = repository;
    }

    static async seedData(): Promise<void> {
        try {
            await MobileModel.insertMany(mobileData);
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error('Error', error);
            throw error;
        }
    }

    async createMobile(data: any): Promise<Mobile> {
        try {
            const newMobile = await this.repository.createMobile(data);
            return newMobile;
        } catch (error) {
            throw new Error('Error creating mobile: ');
        }
    }

    // async getAllMobiles(): Promise<Mobile[]> {
    //   // Return the data from the imported mobileData array
    //   const mobile = mobileData;
    //   // return mobile;
    // }
    async getAllMobiles(): Promise<Mobile[]> {
        const mobiles = await this.repository.getAllMobiles();
        return mobiles;
    }

    async getMobileById(id: string): Promise<Mobile | null> {
        try {
            const mobile = await this.repository.findOne({ _id: id });
            return mobile;
        } catch (error) {
            throw new Error('Error getting mobile by ID');
        }
    }

    async deleteMobileByBrand(brand: string): Promise<Mobile | null> {
        try {
            const deletedMobile = await this.repository.deleteMobileByBrand(brand);
            return deletedMobile;
        } catch (error) {
            throw new Error('Error deleting mobile: ');
        }
    }

    async updateMobileByBrand(brand: string, updatedData: any): Promise<Mobile | null> {
        try {
            const updatedMobile = await this.repository.updateMobileByBrand(brand, updatedData);
            return updatedMobile;
        } catch (error) {
            throw new Error('Error updating mobile: ');
        }
    }

    async getMobilesByColor(color: string): Promise<Mobile[]> {
        try {
            const mobiles = await this.repository.getMobilesByColor(color);
            return mobiles;
        } catch (error) {
            throw new Error('Error getting mobiles by color');
        }
    }
}
export default MobileService;
