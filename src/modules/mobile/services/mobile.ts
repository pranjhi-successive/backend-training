import mobileData from '../../../utils/mobile';
import IMobile from '../entities/MobileInterface';
import MobileRepository from '../repository/Mobile';
import MobileModel from '../repository/model/Mobile';

class MobileService {
    private readonly repository: MobileRepository;

    constructor() {
        this.repository = new MobileRepository();
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

    createMobile = async (data: any): Promise<IMobile> => {
        const newMobile = await this.repository.createMobile(data);
        return newMobile;
    };

    getModelNumber = async (data: string): Promise<IMobile> => {
        const newModel = await this.repository.getModelNumber(data);

        return newModel;
    };

    getAllMobiles = async (): Promise<IMobile[]> => {
        const mobiles = await this.repository.getAllMobiles();
        return mobiles;
    };

    getMobileById = async (id: string): Promise<IMobile | null> => {
        const mobile = await this.repository.findOne({ _id: id });
        return mobile;
    };

    deleteMobileByBrand = async (brand: string): Promise<IMobile | null> => {
        const deletedMobile = await this.repository.deleteMobileByBrand(brand);
        return deletedMobile;
    };

    updateMobileByBrand = async (brand: string, updatedData: any): Promise<IMobile | null> => {
        const updatedMobile = await this.repository.updateMobileByBrand(brand, updatedData);
        return updatedMobile;
    };

    getMobilesByColor = async (color: string): Promise<IMobile[]> => {
        const mobiles = await this.repository.getMobilesByColor(color);
        return mobiles;
    };

    getAllMobilesPaginated = async (page: number, itemsPerPage: number): Promise<IMobile[]> => {
        const skip = (page - 1) * itemsPerPage;
        const mobiles = await this.repository.getAllMobilesPaginated(skip, itemsPerPage);
        return mobiles;
    };

    getTotalMobiles = async (): Promise<number> => {
        const totalMobiles = await this.repository.getTotalMobiles();
        return totalMobiles;
    };
}
export default MobileService;
