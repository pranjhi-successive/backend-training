/* eslint-disable no-console */
import { Request, Response } from 'express';
import csvtojson from 'csvtojson';
import MobileModel from '../repository/model/Mobile';
import IMobile from '../entities/MobileInterface';

const importUser = async (req:Request, res:Response) => {
    try {
        const csvPath : string = req.file?.path || ' ';
        const jsonObj = await csvtojson().fromFile(csvPath);

        // csvtojson()
        //     .fromFile(csvPath)
        //     .then((jsonObj) => {
        //         console.log(jsonObj);
        //     });
        // console.log(jsonObj.length);
        // const mobile: any = jsonObj[1];
        // console.log('before: ', mobile);
        // jsonObj.forEach((mobile: any) => {
        // mobile.accessories = JSON.parse(mobile.accessories);
        // });

        const mobiles: IMobile[] = jsonObj.map((item) => {
            console.log(item);
            return { ...item, accessories: JSON.parse(item.accessories) };
        });
        // console.log('after', mobile);

        // const result: any = await MobileModel.create(mobile);
        const result: any = await MobileModel.insertMany(mobiles);
        console.log('result:', result);
        res.send({ status: 200, success: true, message: 'running' });
    } catch (error:any) {
        console.error(error);
        res.send({ status: 400, success: false, message: error.message });
    }
};
export default importUser;
