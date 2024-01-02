/* eslint-disable no-console */
import { type Request, type Response } from 'express';
import MobileService from '../services/mobile';
// import mobileData from '../../../utils/mobile';
// import { type Mobile } from "../../../entities/MobileInterface";

class MobileController {
    private readonly service: MobileService;

    constructor() {
        this.service = new MobileService();

        // Normal functions
        // this.createMobile = this.createMobile.bind(this);
    }

    createMobile = async (req: Request, res: Response): Promise<void> => {
        console.log('Reached create controller');
        try {
            const data = req.body;
            console.log('Data:', data);
            const createdMobile = await this.service.createMobile(data);
            res.status(201).json({
                status: 'success',
                data: createdMobile,
                time: new Date(),
            });
        } catch (error:any) {
            // console.error('Error creating mobile:', error);
            res.status(500).json({
                status: 'error',
                message: 'Internal Server Error',
                time: new Date(),
                error: error.message,
            });
        }
    };

    getAllMobiles = async (req: Request, res: Response): Promise<any> => {
        // console.log('Reached controller');
        try {
            console.log(req.query);
            // const mobiles = await this.service.getAllMobiles();
            const pageStr = req.query.page as string;
            const limitStr = req.query.limit as string;
            const mobiles = await
            this.service
                .getAllMobilesPaginated(parseInt(pageStr, 10), parseInt(limitStr, 10));
            // const data = mobileData;
            res.status(200).json({
                status: 'success',
                data: mobiles,
                time: new Date(),
            });
        } catch (error) {
            // console.error('Error getting all mobiles:', error);
            res.status(500).json({
                status: 'error',
                message: 'Internal Server Error',
                time: new Date(),
            });
        }
    };

    getMobileById = async (req: Request, res: Response): Promise<void> => {
        const { brand } = req.params;
        try {
            const mobile = await this.service.getMobileById(brand);

            if (mobile) {
                res.status(200).json({
                    status: 'success',
                    data: mobile,
                    time: new Date(),
                });
            } else {
                res
                    .status(404)
                    .json({ status: 'not found', message: 'Mobile not found' });
            }
        } catch (error) {
            // console.error('Error getting mobile by ID:', error);
            res.status(500).json({
                status: 'error',
                message: 'Internal Server Error',
                time: new Date(),
                // error: error.message,
            });
        }
    };

    deleteMobileByBrand = async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;
        // console.log('hello', req.params);
        // console.log('heyyyyyyy', req.query);
        try {
            const deletedMobile = await this.service.deleteMobileByBrand(id);

            if (deletedMobile) {
                res.status(200).json({
                    status: 'success',
                    data: deletedMobile,
                    time: new Date(),
                });
            } else {
                res
                    .status(404)
                    .json({ status: 'not found', message: 'Mobile not found' });
            }
        } catch (error: any) {
            // // console.error('Error deleting mobile:', error);
            res.status(500).json({
                status: 'error',
                message: 'Internal Server Error',
                time: new Date(),
                error: error.message, // Add the specific error message to the response
            });
        }
    };

    updateMobileByBrand = async (req: Request, res: Response): Promise<void> => {
        const { brand } = req.params;
        const updatedData = req.body;
        try {
            const updatedMobile = await this.service.updateMobileByBrand(brand, updatedData);
            if (updatedMobile) {
                res.status(200).json({
                    status: 'success',
                    data: updatedMobile,
                    time: new Date(),
                });
            } else {
                res.status(404).json({
                    status: 'not found',
                    message: 'Not found',
                    time: new Date(),
                });
            }
        } catch (error:any) {
            res.status(500).json({
                status: 'error',
                message: 'Internal Server Error',
                time: new Date(),
                error: error.message,

            });
        }
    };

    getMobilesByColor = async (req: Request, res: Response): Promise<void> => {
        const { color } = req.params;
        try {
            const mobiles = await this.service.getMobilesByColor(color);
            res.status(200).json({
                status: 'success',
                data: mobiles,
                time: new Date(),
            });
        } catch (error : any) {
            res.status(500).json({
                status: 'error',
                message: 'Internal Server Error',
                time: new Date(),
                error: error.message,

            });
        }
    };

    getModelNumber = async (req: Request, res: Response): Promise<void> => {
        const { modelNumber } = req.params;

        // console.log('Reached ModelNumber controller!');
        // console.log(modelNumber);

        try {
            const mobiles = await this.service.getModelNumber(modelNumber);
            res.status(200).json({
                status: 'success',
                data: mobiles,
                time: new Date(),
            });
        } catch (error : any) {
            res.status(500).json({
                status: 'error',
                message: 'Internal Server Error',
                time: new Date(),
                error: error.message,

            });
        }
    };
}
export default MobileController;