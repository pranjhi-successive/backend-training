/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-shadow */
/* eslint-disable no-undef */
/* eslint-disable camelcase */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-inner-declarations */
import { type Request, type Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import Papa from 'papaparse';
import MobileService from '../Services';
import logger from '../../../lib/logger';
import IBulkError from '../bulkUploadError/interface';
import BulkErrorDetail from '../bulkUploadError/schema';
import MobileModel from '../repository/model';
import IBulkUpload from './entities/interace';
import BulkUpload from './model';
import { mobileJoiSchema } from '../validation';

class BulkController {
    private readonly service: MobileService;

    constructor() {
        this.service = new MobileService();
    }

    public bulkUpload = async (req: Request, res: Response): Promise<void> => {
        try {
            logger.info('Start of bulkUsingPapaParse function');

            const session_id: string = uuidv4();
            const startTime = Date.now();
            const batchSize = 1000;
            let parsedDataCnt = 0;
            let errorCnt = 0;
            let bulkData: any[] = [];
            let bulkUploadErrors: any[] = [];
            const csvFile: Express.Multer.File | undefined = req.file;

            function transformRowData(obj: any) {
                const res:any = {};

                for (const key in obj) {
                    const keys = key.split('.');
                    let currentObj: any = res;

                    for (let i = 0; i < keys.length - 1; i += 1) {
                        currentObj[keys[i]] = currentObj[keys[i]] || {};
                        currentObj = currentObj[keys[i]];
                    }

                    currentObj[keys[keys.length - 1]] = obj[key];
                }
                if (res.accessories) {
                    res.accessories = JSON.parse(res.accessories);
                }
                if (res.additionalFeatures) {
                    res.additionalFeatures = res.additionalFeatures.split(',');
                }
                return res;
            }

            if (csvFile) {
                const filePath = csvFile.path;
                const readStream = fs.createReadStream(filePath);

                Papa.parse(readStream, {
                    header: true,
                    dynamicTyping: true,
                    worker: true,
                    async step(result, parser) {
                        try {
                            logger.info('Inside Papa.parse step function');
                            const rowData = result.data;
                            const transformedObject = transformRowData(rowData);
                            parsedDataCnt += 1;
                            const { error } = mobileJoiSchema.validate(transformedObject, {
                                abortEarly: false,
                            });

                            if (error) {
                                logger.info('Validation Error:', error);
                                errorCnt += 1;
                                const bulkErrorDetail: IBulkError = {
                                    totalEntries: parsedDataCnt,
                                    errorDetails: Object(error.message),
                                    session_id,
                                };

                                bulkUploadErrors.push({
                                    insertOne: {
                                        document: bulkErrorDetail,
                                    },
                                });

                                if (bulkUploadErrors.length === batchSize) {
                                    parser.pause();
                                    await BulkErrorDetail.bulkWrite(bulkUploadErrors);
                                    bulkUploadErrors = [];
                                    parser.resume();
                                }
                            } else {
                                bulkData.push({
                                    insertOne: {
                                        document: transformedObject,
                                    },
                                });

                                if (bulkData.length === batchSize) {
                                    parser.pause();
                                    logger.info('Bulk write started!');
                                    await MobileModel.bulkWrite(bulkData, { ordered: false });
                                    logger.info('Bulk write ended!');
                                    bulkData = [];
                                    parser.resume();
                                }
                            }
                        } catch (stepError) {
                            logger.error('Error in Papa.parse step function:');
                            parser.resume();
                        }
                    },
                    async complete() {
                        try {
                            logger.info('Inside Papa.parse complete function');
                            if (bulkData.length > 0) {
                                try {
                                    await MobileModel.bulkWrite(bulkData, { ordered: false });
                                } catch (bulkWriteError) {
                                    if (bulkWriteError && typeof bulkWriteError === 'object' && 'writeErrors' in bulkWriteError) {
                                        const { writeErrors } = (bulkWriteError as any);

                                        for (const writeError of writeErrors) {
                                            if (writeError.code === 11000) {
                                                errorCnt += 1;

                                                const duplicateKeyError: IBulkError = {
                                                    totalEntries: parsedDataCnt,
                                                    errorDetails: `Duplicate key error: ${writeError.errmsg}`,
                                                    session_id,
                                                };

                                                bulkUploadErrors.push({
                                                    insertOne: {
                                                        document: duplicateKeyError,
                                                    },
                                                });
                                            }
                                        }
                                    } else {
                                        logger.error('Error in bulk write:', bulkWriteError);
                                    }
                                }

                                bulkData = [];
                            }

                            logger.info('After bulk-write');

                            if (bulkUploadErrors.length > 0) {
                                await BulkErrorDetail.bulkWrite(
                                    bulkUploadErrors,
                                    { ordered: false },
                                );
                                bulkUploadErrors = [];
                            }
                        } catch (completeError) {
                            logger.error('Error in Papa.parse complete function:', completeError);
                        } finally {
                            fs.unlinkSync(filePath);

                            const endTime = Date.now();
                            const bulkUploadRecord: IBulkUpload = {
                                fileName: req.file?.originalname ?? 'unknown.csv',
                                totalEntries: parsedDataCnt,
                                totalErrors: errorCnt,
                                timeTaken: (endTime - startTime) / 1000,
                                session_id,
                            };

                            await BulkUpload.create(bulkUploadRecord);
                            res.status(200).json({ sucess: 'true' });
                        }
                    },
                    async error(parseError) {
                        logger.error('Error in Papa.parse:', parseError);
                    },
                });
            } else {
                logger.info('No file selected');
            }
        } catch (error) {
            logger.error('Error in bulkUsingPapaParse function:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    };

    public getAllBulkUploads = async (
        req: Request,
        res: Response,
    ): Promise<void> => {
        try {
            const bulkUploads: IBulkUpload[] | null = await BulkUpload.find().limit(
                40,
            );
            res.status(200).json(bulkUploads);
        } catch (error) {
            res.status(404).json(error);
        }
    };

    public getBulkUploadErrorDetails = async (
        req: Request,
        res: Response,
    ): Promise<void> => {
        const { sessionId } = req.params;
        try {
            const data = await MobileService.getAllErrorDetails(sessionId);

            if (data) {
                res.status(200).json({
                    status: 'success',
                    data,
                    time: new Date(),
                });
            } else {
                throw new Error('No Data Found');
            }
        } catch (err) {
            res.status(500).json({ error: err });
        }
    };
}
export default BulkController;
