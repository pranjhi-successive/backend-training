/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */
import mongoose from 'mongoose';
import countriesData from '../utils/country';
import mobileData from '../utils/mobile';
import MobileModel from '../modules/mobile/repository/model';
import dataUser from '../utils/User';
import { CountryModel } from '../modules/country/repository/model/mobile';
import userModel from '../modules/user/repository/model';
import logger from './logger';
import UserServices from '../modules/user/Services';

class Database {
    uri: string;

    constructor(url:string) {
        this.uri = url;
    }

    connect = async (): Promise<void> => {
        try {
            await mongoose.connect(this.uri);

            logger.info('Database Connected');
        } catch (error) {
            logger.error('DATABASE CONNECTION FAILED:', error);
            process.exit(1);
        }
    };

    disconnect = async (): Promise<void> => {
        try {
            await mongoose.disconnect();
        } catch (error) {
            logger.error('mongodb dissconnection error', error);
        }
    };

    static seed = async (): Promise<void> => {
        try {
            await CountryModel.insertMany(countriesData);
            logger.info('seeded succesfully');
        } catch (error) {
            logger.info('error in seeding', error);
        }
    };

    static seedMobile = async (): Promise<void> => {
        try {
            await Promise.all(
                mobileData.map(async (mobile) => {
                    const existingMobile = await MobileModel.findOne({
                        modelNumber: mobile.modelNumber,
                        color: mobile.color,
                    });

                    if (!existingMobile) {
                        await MobileModel.create(mobile);
                        logger.info(`Mobile data seeded successfully ${mobile.modelNumber} ${mobile.color}`);
                    } else {
                        logger.info(`Mobile data already exists ${mobile.modelNumber} ${mobile.color}. Skipped seeding.`);
                    }
                }),
            );
        } catch (error) {
            logger.error('Error in seeding mobile data:', error);
        }
    };

    static seedUser = async (): Promise<void> => {
        try {
            await Promise.all(
                dataUser.map(async (user) => {
                    const existingUser = await userModel.findOne({
                        email: user.email,
                    });
                    if (!existingUser) {
                        const hashedPassword = await UserServices.generateHashedPassword(
                            user.password,
                        );
                        await userModel.create({ ...user, password: hashedPassword });
                        logger.info('User data added successfully');
                    }
                }),
            );
        } catch (error) {
            logger.error('Error in seeding user data:', error);
        }
    };

    static seedAll = async (): Promise<void> => {
        await Database.seed();
        await Database.seedMobile();
        await Database.seedUser();
    };
}

export default Database;
