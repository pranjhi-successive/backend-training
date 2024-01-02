/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express';

import MobileService from './services/mobile';
import MobileController from './controller/Mobile';

const mobileRouter = express.Router();
mobileRouter.use(express.json());

const mobileController = new MobileController();
mobileRouter.get('/mobiles', mobileController.getAllMobiles);
mobileRouter.post('/m/:id', async (req, res) => {
    await mobileController.getMobileById(req, res);
});
mobileRouter.delete('/mobiles/:id', mobileController.deleteMobileByBrand);
mobileRouter.post('/create', mobileController.createMobile);
mobileRouter.post('/seed-data', async (req, res) => {
    await MobileService.seedData();
    res.status(200).json({
        status: '200',
        message: ' seeded successfully',
        data: req.body,
        time: new Date(),
    });
});
mobileRouter.get('/mobiles/:modelNumber', mobileController.getModelNumber);
mobileRouter.get('/mobile/color/:color', async (req, res) => {
    await mobileController.getMobilesByColor(req, res);
});
mobileRouter.put('/mobile/:brand', async (req, res) => {
    await mobileController.updateMobileByBrand(req, res);
});
// mobileRouter.get('*', (req, res) => {
//     res.status(404).json({
//         status: '404',
//         message: ' Not Found',
//         time: new Date(),
//     });
// });
export default mobileRouter;
