/* eslint-disable no-console */
import mongoose from 'mongoose';
import countriesData from '../utils/Country';
import mobileData from '../utils/mobile';
import MobileModel from '../modules/mobile/repository/model/Mobile';
import dataUser from '../utils/User';
import { CountryModel } from '../modules/country/repository/model/mobile';
import userModel from '../modules/user/repository/model/user';
// import importUser from '../modules/mobile/bulkUpload/controller';
// import generateMobileData from '../modules/bulkUpload/Data';
// import generateMobileData from '../modules/bulkUpload/Data';

class Database {
    uri: string;

    constructor() {
        this.uri = process.env.MONGO_URL || '';
    }

    // connect = async (): Promise<void> => {
    //     try {
    //         await mongoose.connect(this.uri);
    //         console.log('Database Connected');
    //         await Database.seed();
    //         await Database.seedMobile();
    //         await Database.seedUser();
    //     } catch (error) {
    //         console.log(error);
    //         console.error('DATABASE CONNECTION FAILED');
    //         process.exit(0);
    //     }
    // };
    connect = async (): Promise<void> => {
        try {
            if (!this.uri) {
                throw new Error('MongoDB URI not provided. Check your environment variables.');
            }

            await mongoose.connect(this.uri);

            console.log('Database Connected');
            await Database.seed();
            await Database.seedMobile();
            await Database.seedUser();
            // await Database.csvSeed();
            // await Database.generateAndSaveMobileData();
        } catch (error) {
            console.error('DATABASE CONNECTION FAILED:', error);
            process.exit(1);
        }
    };

    static seed = async (): Promise<void> => {
        try {
            await CountryModel.insertMany(countriesData);
            //  console.log('seeded succesfully');
        } catch (error) {
            //  console.log('error in seeding', error);
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
                        console.log(`Mobile data seeded successfully ${mobile.modelNumber} ${mobile.color}`);
                    } else {
                        console.log(`Mobile data already exists ${mobile.modelNumber} ${mobile.color}. Skipped seeding.`);
                    }
                }),
            );
        } catch (error) {
            console.error('Error in seeding mobile data:', error);
        }
    };

    static seedUser = async ():Promise<void> => {
        try {
            // const exist = await userModel.countDocuments();

            await userModel.insertMany(dataUser);
            // console.log('user data added successfully');

            // } else {
            //     console.log('user data already exists. Skipped seeding.');
            // }
        } catch (error) {
            console.error('Error in seeding user data:', error);
        }
    };

    // static csvSeed = async ():Promise<void> => {
    //     try {
    //         const csvPath : string = req.file?.path || ' ';
    //     const jsonObj = await csvtojson().fromFile(csvPath);
    //         await userModel.insertMany(jsonObj);
    //     } catch (error) {
    //         console.error('Error in seeding ', error);
    //     }
    // };
    // static generateAndSaveMobileData = async () => {
    //     const mobileDataList = Array.from({ length: 100 }, generateMobileData);
    //     console.log(mobileDataList);
    //     await MobileModel.insertMany(mobileDataList);
    //     console.log('Mobile data generation and save complete.');
    //     mongoose.disconnect();
    // };
}

export default Database;
