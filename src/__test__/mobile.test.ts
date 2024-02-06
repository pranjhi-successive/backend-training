/* eslint-disable no-underscore-dangle */

import express from 'express';

import request from 'supertest';
import { serverConfig } from '../config';
import Server from '../server';
import MobileService from '../modules/mobile/Services';

describe('API Integration Tests', () => {
    let server:Server;
    let app: express.Application;
    let mobileService: MobileService;
    const testMobile = {
        brand: 'Xiaomi1234',
        modelNumber: 'Mi 1123',
        price: 699.99,
        color: 'Midnight Gray',
        specifications: {
            display: '6.81 inches AMOLED',
            camera: 'Triple 108 MP, 13 MP, 5 MP',
            processor: 'Snapdragon 888',
            storage: '128 GB',
        },
        releaseDate: new Date('2022-02-15'),
        batteryCapacity: '4600 mAh',
        connectivity: {
            wifi: true,
            bluetooth: true,
            cellular: true,
        },
        weight: 196,
        operatingSystem: 'MIUI 12',
        isWaterResistant: true,
        additionalFeatures: ['Harman Kardon-tuned speakers', 'Fast Charging'],
        accessories: [
            { name: 'Mi Wireless Charger', type: 'Charging', price: 39.99 },
            { name: 'Leather Flip Case', type: 'Case', price: 19.99 },
        ],
        warranty: {
            validUntil: new Date('2023-02-15'),
            type: 'Xiaomi Warranty',
        },
        image: 'https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-mi11-ultra-5g-k1-1.jpg',
    };
    beforeAll(async () => {
        server = new Server(serverConfig);
        app = server.getApp();
        await server.connectDB();
        await Server.seed();
        mobileService = new MobileService();
    });
    afterAll(async () => {
        await server.disconnectDB();
    });
    afterEach(async () => {
        await server.connectDB();
        await MobileService.deleteAllMobiles();
        await Server.seed();
    });
    test('GET /api/mobiles', async () => {
        const response = await request(app).get('/api/mobiles').query({
            page: 4,
            limit: 2,
        });

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            status: 'success',
            data: expect.objectContaining({}),
            time: expect.stringContaining(''),
        });
    });
    test('GET /api/mobiles', async () => {
        const response = await request(app).get('/api/mobiles').query({
            page: '40000',
            limit: 2,
        });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 'error',
            message: 'This page does not exist',
            data: expect.objectContaining({}),
            time: expect.stringContaining(''),
        });
    });
    test('GET /api/mobiles', async () => {
        await server.disconnectDB();
        const response = await request(app).get('/api/mobiles');

        expect(response.status).toBe(500);
        expect(response.body).toEqual({
            status: 'error',
            message: 'Internal Server Error',
            time: expect.stringContaining(''),
        });
    });
    test('GET /api/mobiles/:modelNumber', async () => {
        const response = await request(app).get('/api/mobiles/Samsung');

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            status: 'success',
            data: expect.objectContaining({}),
            time: expect.stringContaining(''),
        });
    });
    test('GET /api/mobiles/:modelNumber', async () => {
        await server.disconnectDB();
        const response = await request(app).get('/api/mobiles/Samsung');

        expect(response.status).toBe(500);
        expect(response.body).toEqual({
            status: 'error',
            message: 'Internal Server Error',
            time: expect.stringContaining(''),
            error: expect.stringContaining(''),
        });
    });
    test('GET /api/mobile/color/:color', async () => {
        const response = await request(app).get('/api/mobile/color/Phantom Gray');

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            status: 'success',
            data: expect.objectContaining({}),
            time: expect.stringContaining(''),
        });
    });
    test('GET /api/mobile/color/:color', async () => {
        await server.disconnectDB();
        const response = await request(app).get('/api/mobile/color/Phantom Gray');

        expect(response.status).toBe(500);
        expect(response.body).toEqual({
            status: 'error',
            message: 'Internal Server Error',
            time: expect.stringContaining(''),
            error: expect.stringContaining(''),
        });
    });
    test('POST /api/create', async () => {
        const response = await request(app).post('/api/create').send({
            brand: 'Example Brand',
            modelNumber: 'X1233er',
            price: 999.99,
            color: 'Black',
            specifications: {
                display: '6.4 inches AMOLED',
                camera: '48 MP + 12 MP dual camera',
                processor: 'Octa-core Snapdragon 865',
                storage: '256GB',
            },
            releaseDate: new Date('2023-01-01'),
            batteryCapacity: '4000 mAh',
            connectivity: {
                wifi: true,
                bluetooth: true,
                cellular: true,
            },
            weight: 180,
            operatingSystem: 'Android 11',
            isWaterResistant: true,
            additionalFeatures: ['Fingerprint sensor', 'Wireless charging'],
            accessories: [
                {
                    name: 'Protective Case',
                    type: 'Hard Shell',
                    price: 19.99,
                },
                {
                    name: 'Wireless Earbuds',
                    type: 'Bluetooth',
                    price: 79.99,
                },
            ],
            warranty: {
                validUntil: new Date('2024-01-01'),
                type: 'Extended',
            },
            image: 'example_mobile_image.jpg',
        });

        expect(response.status).toBe(201);
        expect(response.body).toEqual({
            status: 'success',
            data: expect.objectContaining({}),
            time: expect.stringContaining(''),
        });
    });
    test('POST /api/create', async () => {
        await server.disconnectDB();
        const response = await request(app).post('/api/create').send({
            brand: 'Example Brand',
        });

        expect(response.status).toBe(500);
        expect(response.body).toEqual({
            status: 'error',
            message: 'Internal Server Error',
            time: expect.stringContaining(''),
            error: expect.stringContaining(''),
        });
    });

    test('GET/:id', async () => {
        const result:any = await mobileService.createMobile(testMobile);
        const testId = result._id.toString();
        let response = await request(app).get(`/api/${testId}`);
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            status: 'success',
            data: expect.objectContaining({}),
            time: expect.stringContaining(''),
        });

        const mockId: string = '5f8d5a4c7d5ae23a9c6bdc47';
        response = await request(app).get(`/api/${mockId}`);

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 'error',
            message: 'this mobile doesnot exist ',
            data: expect.objectContaining({}),
            time: expect.stringContaining(''),
        });
        await server.disconnectDB();
        response = await request(app).get(`/api/${mockId}`);

        expect(response.status).toBe(500);
        expect(response.body).toEqual({
            status: 'error',
            message: 'Internal Server Error',
            time: expect.stringContaining(''),
            error: expect.stringContaining(''),
        });
    });
    test('DELETE /mobiles/:id', async () => {
        const result: any = await mobileService.createMobile(testMobile);
        const testId = result._id.toString();
        let response = await request(app).delete(`/api/mobiles/${testId}`);

        expect(response.status).toBe(200);
        expect(response.body).toEqual({

            status: 'success',
            data: expect.objectContaining({}),
            time: expect.stringContaining(''),
        });
        const mockId: string = '659b97adb3ca3e4cc7beb098';
        response = await request(app).delete(`/api/mobiles/${mockId}`);

        expect(response.status).toBe(404);
        expect(response.body).toEqual({
            status: 'not found',
            message: 'Mobile not found',
        });
        await server.disconnectDB();
        response = await request(app).delete(`/api/mobiles/${testId}`);

        expect(response.status).toBe(500);
        expect(response.body).toEqual({
            status: 'error',
            message: 'Internal Server Error',
            time: expect.stringContaining(''),
            error: expect.objectContaining({}),
        });
    });
    test('PUT api/mobile/:id', async () => {
        const result: any = await mobileService.createMobile(testMobile);
        const testId = result._id.toString();
        let response = await request(app).put(`/api/mobile/${testId}`).send({
            brand: 'Xiaomi1234ghrtt',
            modelNumber: 'Mi 1123455',
            price: 699.99,
            color: 'Midnight Gray',
            specifications: {
                display: '6.81 inches AMOLED',
                camera: 'Triple 108 MP, 13 MP, 5 MP',
                processor: 'Snapdragon 888',
                storage: '128 GB',
            },
            releaseDate: new Date('2022-02-15'),
            batteryCapacity: '4600 mAh',
            connectivity: {
                wifi: true,
                bluetooth: true,
                cellular: true,
            },
            weight: 196,
            operatingSystem: 'MIUI 12',
            isWaterResistant: true,
            additionalFeatures: ['Harman Kardon-tuned speakers', 'Fast Charging'],
            accessories: [
                { name: 'Mi Wireless Charger', type: 'Charging', price: 39.99 },
                { name: 'Leather Flip Case', type: 'Case', price: 19.99 },
            ],
            warranty: {
                validUntil: new Date('2023-02-15'),
                type: 'Xiaomi Warranty',
            },
            image: 'https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-mi11-ultra-5g-k1-1.jpg',
        });

        expect(response.status).toBe(200);
        expect(response.body).toEqual({

            status: 'success',
            data: expect.objectContaining({}),
            time: expect.stringContaining(''),
        });
        const mockId: string = '5f8d5a4c7d5ae23a9c6bdc47';
        response = await request(app).put(`/api/mobile/${mockId}`);

        expect(response.status).toBe(404);
        expect(response.body).toEqual({
            status: 'not found',
            message: 'Not found',
            time: expect.stringContaining(''),
        });
        await server.disconnectDB();
        response = await request(app).put(`/api/mobile/${testId}`);

        expect(response.status).toBe(500);
        expect(response.body).toEqual({
            status: 'error',
            message: 'Internal Server Error',
            time: expect.stringContaining(''),
            error: expect.objectContaining({}),
        });
    });
});
