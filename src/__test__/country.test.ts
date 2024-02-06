import express from 'express';
import request from 'supertest';
import Server from '../server';
import { serverConfig } from '../config';

describe('API Integration Tests', () => {
    let server:Server;
    let app: express.Application;

    beforeAll(async () => {
        server = new Server(serverConfig);
        app = server.getApp();
        await server.connectDB();
        await Server.seed();
    });
    afterEach(async () => {
        await server.connectDB();
    });
    test('POST /country/addPlayer', async () => {
        const response = await request(app).post('/country/addPlayer').send({
            countryName: 'helloo',
            playersName: [
                'Gurmeet Singh1111',
                'Dheeraj Singh Moirangthem',
                'Sumit Rathi',
                'Narender Gahlot',
                'Deepak Tangri',
                'Sandesh Jhingan',
                'Chinglensana Singh',
                'Lalchungnunga',
            ],
        });

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            status: '200',
            message: 'Players added successfully',
            data: expect.objectContaining({}),
            time: expect.stringContaining(''),
        });
    });
    test('POST /country/addPlayer', async () => {
        const response = await request(app).post('/country/addPlayer');

        expect(response.status).toBe(500);
        expect(response.body).toEqual({
            status: '500',
            message: ' Internal Server Error',
            time: expect.stringContaining(''),
        });
    });

    test('GET /country/:name', async () => {
        const response = await request(app).get('/country/Brazil');

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            status: '200',
            message: 'successfull',
            data: expect.objectContaining({}),
            time: expect.stringContaining(''),
        });
    });
    test('GET /country/:name', async () => {
        const response = await request(app).get('/country/br');

        expect(response.status).toBe(404);
        expect(response.body).toEqual({
            status: '404',
            message: ' Error No country found ',
            time: expect.stringContaining(''),
        });
    });
    test('GET /country/:name', async () => {
        await server.disconnectDB();
        const response = await request(app).get('/country/Brazil');

        expect(response.status).toBe(500);
        expect(response.body).toEqual({
            status: '500',
            message: ' Internal Server Error',
            time: expect.stringContaining(''),
        });
    });
});
