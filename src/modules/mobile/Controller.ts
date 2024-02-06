/* eslint-disable no-console */
import { type Request, type Response } from 'express';
import MobileService from './Services';
import logger from '../../lib/logger';
import IMobile from './entities/MobileInterface';

class MobileController {
    private readonly service: MobileService;

    constructor() {
        this.service = new MobileService();
    }

    getById = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            const mobile: IMobile | null = await this.service.getById(id);

            if (!mobile) {
                res.status(400).json({
                    status: 'error',
                    message: 'this mobile doesnot exist ',
                    data: req.query,
                    time: new Date(),
                });
                return;
            }

            res.status(200).json({
                status: 'success',
                data: mobile,
                time: new Date(),
            });
        } catch (error: any) {
            logger.error('error in getById', error);

            res.status(500).json({
                status: 'error',
                message: 'Internal Server Error',
                time: new Date(),
                error: error.message,
            });
        }
    };

    createMobile = async (req: Request, res: Response): Promise<void> => {
        try {
            const data = req.body;
            logger.info('Data:', data);
            const createdMobile = await this.service.createMobile(data);
            res.status(201).json({
                status: 'success',
                data: createdMobile,
                time: new Date(),
            });
        } catch (error:any) {
            logger.error('Error creating mobile:', error);
            res.status(500).json({
                status: 'error',
                message: 'Internal Server Error',
                time: new Date(),
                error: error.message,
            });
        }
    };

    getAllMobiles = async (req: Request, res: Response): Promise<any> => {
        try {
            const filter = await MobileService.getFilters(req.query);
            const total = await this.service.countDocuments(filter);
            const pageStr = req.query.page as string ?? '1';
            const limitStr = req.query.limit as string ?? '6';
            const page = parseInt(pageStr, 10);
            const limit = parseInt(limitStr, 10);
            const skip = (page - 1) * limit;
            if (skip > total) {
                res.status(400).json({
                    status: 'error',
                    message: 'This page does not exist',
                    data: req.query,
                    time: new Date(),
                });
                return;
            }

            const mobiles = await this.service.getAllMobiles(req.query, filter, page, limit);

            res.status(200).json({
                status: 'success',
                data: { mobiles, total },
                time: new Date(),
            });
        } catch (error) {
            logger.error('Error getting all mobiles:', error);
            res.status(500).json({
                status: 'error',
                message: 'Internal Server Error',
                time: new Date(),
            });
        }
    };

    deleteMobileById = async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;

        try {
            const deletedMobile = await this.service.deleteMobileById(id);

            if (deletedMobile.deletedCount > 0) {
                res.status(200).json({
                    status: 'success',
                    data: deletedMobile,
                    time: new Date(),
                });
            } else {
                res
                    .status(404)
                    .json({
                        status: 'not found',
                        message: 'Mobile not found',
                    });
            }
        } catch (error: any) {
            logger.error('Error deleting mobile:', error);
            res.status(500).json({
                status: 'error',
                message: 'Internal Server Error',
                time: new Date(),
                error: error.message,
            });
        }
    };

    updateMobileById = async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;
        const updatedData = req.body;
        try {
            const updatedMobile = await this.service.updateMobileById(id, updatedData);
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
