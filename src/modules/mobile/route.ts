/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express';

import { model } from 'mongoose';
import MobileRepository from './repository/Mobile';
import mobileSchema from './repository/schema/Mobile';
import { Mobile } from './entities/MobileInterface';
import MobileService from './services/mobile';
import MobileController from './controller/Mobile';

const mobileRouter = express.Router();
mobileRouter.use(express.json());

const mobileRepository = new MobileRepository(
    model<Mobile>('Mobile', mobileSchema),
    'your_additional_property',
);
const mobileService = new MobileService(mobileRepository);
const mobileController = new MobileController(mobileService);
mobileRouter.get('/mobiles', MobileController.getAllMobiles);
mobileRouter.post('/m/:id', async (req, res) => {
    await mobileController.getMobileById(req, res);
});
mobileRouter.delete('/mobiles/:id', mobileController.deleteMobileByBrand);
mobileRouter.post('/create', async (req, res) => {
    await mobileController.createMobile(req, res, req.body);
});
mobileRouter.post('/seed-data', async (req, res) => {
    await MobileService.seedData();
    res.status(200).json({
        status: '200',
        message: ' seeded successfully',
        data: req.body,
        time: new Date(),
    });
});
mobileRouter.get('/mobile/color/:color', async (req, res) => {
    await mobileController.getMobilesByColor(req, res);
});
mobileRouter.put('/mobile/:brand', async (req, res) => {
    await mobileController.updateMobileByBrand(req, res);
});
mobileRouter.get('*', (req, res) => {
    res.status(404).json({
        status: '404',
        message: ' Not Found',
        time: new Date(),
    });
});
export default mobileRouter;
