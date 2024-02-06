import express from 'express';
import request from 'supertest';
import Server from '../server';
import { serverConfig } from '../config';

const server: Server = new Server(serverConfig);

const app: express.Application = server.getApp();

describe('API Integration Tests', () => {
    test('GET /health', async () => {
        const response = await request(app).get('/health');

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            status: 'OK', message: 'passed successfully',
        });
    });
});
