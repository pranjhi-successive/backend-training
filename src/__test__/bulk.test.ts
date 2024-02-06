import express from 'express';
import request from 'supertest';
import fs from 'fs';
import Server from '../server';
import { serverConfig } from '../config';
import generateCsv from '../modules/mobile/bulkUpload/csvWriter';

describe('API Integration Tests for bulk uploads', () => {
    let server:Server;
    let app: express.Application;

    beforeAll(async () => {
        server = new Server(serverConfig);
        app = server.getApp();
        await server.connectDB();
        await Server.seed();
    });
    test('GET /up/importUser', async () => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
        const csvPath = `./public/uploads/file-${uniqueSuffix}.csv`;
        await generateCsv(10, csvPath);

        const response = await request(app)
            .post('/up/bulk-upload')
            .attach('file', csvPath);

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            sucess: 'true',
        });

        fs.unlinkSync(csvPath);
    });
});
