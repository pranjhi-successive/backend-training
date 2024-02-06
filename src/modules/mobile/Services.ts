import logger from '../../lib/logger';
import mobileData from '../../utils/mobile';
import IBulkError from './bulkUploadError/interface';
import IMobile from './entities/MobileInterface';
import MobileRepository from './repository/Repository';
import MobileModel from './repository/model';

class MobileService {
    repository: MobileRepository;

    constructor() {
        this.repository = new MobileRepository();
    }

    static async seedData(): Promise<void> {
        try {
            await MobileModel.insertMany(mobileData);
        } catch (error) {
            logger.error('Error', error);
            throw error;
        }
    }

    createMobile = async (data: any): Promise<IMobile> => {
        const newMobile = await this.repository.createMobile(data);
        return newMobile;
    };

    countDocuments = async (filter: any): Promise<any> => {
        const result: number = await this.repository.countDocuments(filter);
        return result;
    };

    getModelNumber = async (data: string): Promise<IMobile> => {
        const newModel = await this.repository.getModelNumber(data);

        return newModel;
    };

    getAllMobiles = async (
        query: any,
        filter: any,
        page: number,
        limit: number,
    ): Promise<IMobile[] | null> => {
        const fields = query.fields
            ? (query.fields as string).split(',').join(' ')
            : '-__v';
        // query = query.select(fields);

        const mobiles = await this.repository.getAllMobiles(
            filter,
            fields,
            page,
            limit,
        );
        return mobiles;
    };

    deleteMobileById = async (id: string): Promise<any> => {
        const deletedMobile = await this.repository.deleteMobileById(id);
        return deletedMobile;
    };

    updateMobileById = async (
        id: string,
        updatedData: any,
    ): Promise<IMobile | null> => {
        const updatedMobile = await this.repository.updateMobileById(
            id,
            updatedData,
        );
        return updatedMobile;
    };

    getMobilesByColor = async (color: string): Promise<IMobile[]> => {
        const mobiles = await this.repository.getMobilesByColor(color);
        return mobiles;
    };

    getAllMobilesPaginated = async (
        page: number,
        itemsPerPage: number,
    ): Promise<IMobile[]> => {
        const skip = (page - 1) * itemsPerPage;
        const mobiles = await this.repository.getAllMobilesPaginated(
            skip,
            itemsPerPage,
        );
        return mobiles;
    };

    static deleteAllMobiles = async (): Promise<void> => {
        await MobileModel.deleteMany();
    };

    getById = async (id: string): Promise<IMobile | null> => {
        const result: IMobile | null = await this.repository.getById(id);
        return result;
    };

    static getFilters = async (queryObj: any): Promise<any> => {
        const filters: any = { ...queryObj };
        const excludedFields = ['page', 'limit', 'fields'];
        excludedFields.forEach((el) => delete filters[el]);
        Object.entries(filters).forEach(([key, value]) => {
            if (typeof value === 'string') {
                filters[key] = value.split(',');
            }
        });

        if (filters.price) {
            const minPrice: string = ((filters.price as string[])[0] as string) ?? '0';
            const maxPrice: string = ((filters.price as string[])[1] as string) ?? '2000';
            filters.price = { $gte: minPrice, $lte: maxPrice };
        }

        if (filters.searchText) {
            filters.modelNumber = { $regex: filters.searchText[0], $options: 'i' };
            delete filters.searchText;
        }
        return filters;
    };

    static getAllErrorDetails = async (sessionId: string) => {
        const result: Error | IBulkError[] | null = await MobileRepository.getAllErrorDetails(
            sessionId,
        );
        return result;
    };
}
export default MobileService;
