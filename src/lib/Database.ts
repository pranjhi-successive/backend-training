import mongoose from 'mongoose';
import countriesData from '../utils/Country';
import { CountryModel } from '../models/Countries';
import mobileData from '../utils/mobile';
import MobileModel from '../modules/mobile/repository/model/Mobile';
import userModel from '../models/User';
import dataUser from '../utils/User';

class Database {
    uri: string;

    constructor() {
        this.uri = process.env.MONGO_URL ?? '';
    }

    connect = async (): Promise<void> => {
        try {
            await mongoose.connect(this.uri);
            // eslint-disable-next-line no-console
            console.log('Database Connected');
            await Database.seed();
            await Database.seedMobile();
            await Database.seedUser();
        } catch (error) {
            // console.log(error);
            // eslint-disable-next-line no-console
            console.error('DATABASE CONNECTION FAILED');
            process.exit(0);
        }
    };

    static seed = async (): Promise<void> => {
        try {
            await CountryModel.insertMany(countriesData);
            // console.log('seeded succesfully');
        } catch (error) {
            // console.log('error in seeding', error);
        }
    };

    // static seedMobile = async (): Promise<void> => {
    //     try {
    //         await MobileModel.insertMany(mobileData);
    //         // console.log('seeded succesfully');
    //     } catch (error) {
    //         // console.log('error in seeding', error);
    //     }
    // };
    static seedMobile = async (): Promise<void> => {
        try {
            const existing = await MobileModel.countDocuments();

            if (existing === 0) {
                await MobileModel.insertMany(mobileData);
                console.log('Mobile data seeded successfully');
            } else {
                console.log('Mobile data already exists. Skipped seeding.');
            }
        } catch (error) {
            console.error('Error in seeding mobile data:', error);
        }
    };

    static seedUser = async ():Promise<void> => {
        try {
            const exist = await userModel.countDocuments();
            if (exist === 0) {
                await userModel.insertMany(dataUser);
                console.log('user data added successfully');
            } else {
                console.log('user data already exists. Skipped seeding.');
            }
        } catch (error) {
            console.error('Error in seeding user data:', error);
        }
    };
}

export default Database;
