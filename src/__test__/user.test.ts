import express from 'express';
import request from 'supertest';
import Server from '../server';
import { serverConfig } from '../config';
import UserServices from '../modules/user/Services';

describe('API Integration Tests', () => {
    let server:Server;
    let app: express.Application;
    let services:UserServices;
    beforeAll(async () => {
        server = new Server(serverConfig);
        app = server.getApp();
        await server.connectDB();
        await Server.seed();
        services = new UserServices();
    });
    afterAll(async () => {
        await server.disconnectDB();
    });
    afterEach(async () => {
        await server.connectDB();
        await services.deleteAll();
        await Server.seed();
    });
    test('GET /user/email/:email', async () => {
        const response = await request(app).get('/user/email/rajesh.singh@example.com');

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            status: 'success',
            message: 'successfull',
            data: expect.objectContaining({}),
            time: expect.stringContaining(''),
        });
    });
    test('GET /user/email/:email', async () => {
        const response = await request(app).get('/user/email/qw@gmail.com');

        expect(response.status).toBe(404);
        expect(response.body).toEqual({
            status: 'error',
            message: 'User not found',
            time: expect.stringContaining(''),
        });
    });
    test('GET /user/email/:email', async () => {
        await server.disconnectDB();
        const response = await request(app).get('/user/email/rajesh.singh@example.com');

        expect(response.status).toBe(500);
        expect(response.body).toEqual({
            status: 'error',
            time: expect.stringContaining(''),
            message: 'Internal Server Error',
            error: expect.stringContaining(''),

        });
    });
    test('GET /user/all', async () => {
        const response = await request(app).get('/user/all');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            status: 'success',
            data: expect.objectContaining({}),
            time: expect.stringContaining(''),
        });
    });
    test('GET /user/all', async () => {
        await server.disconnectDB();
        const response = await request(app).get('/user/all');

        expect(response.status).toBe(500);
        expect(response.body).toEqual({
            status: 'error',
            message: 'Internal Server Error',
            time: expect.stringContaining(''),
            error: expect.stringContaining(''),
        });
    });
    test('POST /user/create', async () => {
        let response = await request(app).post('/user/create').send({
            name: 'Rajesh Kumar',
            phone: '+91 98765 43210',
            email: 'rajesh.kumar@example.in',
            password: 'hashedPassword456',
            address: {
                street: '789 Tulsi Nagar',
                city: 'Delhi',
                state: 'DL',
            },
        });
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            status: 'success',
            message: 'Data added successfully',
            data: expect.objectContaining({}),
            time: expect.stringContaining(''),
        });

        response = await request(app).post('/user/create').send({
            name: 'Rajesh Kumar',
            phone: '+91 98765 43210',
            email: 'rajesh.kumar@example.in',
            password: 'hashedPassword456',

        });
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: '400',
            message: 'validation error',
            time: expect.stringContaining(''),
            error: expect.stringContaining(''),
        });
    });

    test('POST /user/create', async () => {
        await server.disconnectDB();
        const response = await request(app).post('/user/create').send({
            name: 'Rajesh Kumar',
            phone: '+91 98765 43210',
            email: 'rajesh.kumar@example.in',
            password: 'hashedPassword456',
            address: {
                street: '789 Tulsi Nagar',
                city: 'Delhi',
                state: 'DL',
            },
        });
        expect(response.status).toBe(500);
        expect(response.body).toEqual({
            status: 'error',
            time: expect.stringContaining(''),
            error: 'Internal Server Error',
        });
    });
    test('POST /auth/signup', async () => {
        const response = await request(app).post('/auth/signup').send({
            name: 'Rajesh ',
            phone: '+91 98765 43210',
            email: 'rajesh.kumar@example.in',
            password: 'hashedPassword456',
            address: {
                street: '789 Tulsi Nagar',
                city: 'Delhi',
                state: 'DL',
            },
        });
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            status: '200',
            message: 'user created',
            token: expect.stringContaining(''),
            user: expect.objectContaining({}),
            time: expect.stringContaining(''),

        });
    });

    test('POST /auth/signup', async () => {
        await server.disconnectDB();
        const response = await request(app).post('/auth/signup').send({
            name: 'Rajesh ',
            phone: '+91 98765 43210',
            email: 'rajesh.kumar@example.in',
            password: 'hashedPassword456',
            address: {
                street: '789 Tulsi Nagar',
                city: 'Delhi',
                state: 'DL',
            },
        });
        expect(response.status).toBe(500);
        expect(response.body).toEqual({
            status: '500',
            message: ' Internal Server Error',
            time: expect.stringContaining(''),

        });
    });
    test('POST /auth/login', async () => {
        await server.disconnectDB();
        const response = await request(app).post('/auth/login').send({
            name: 'Rajesh Kumar',
            password: 'hashedPassword456',
        });
        expect(response.status).toBe(500);
        expect(response.body).toEqual({
            status: '500',
            message: ' Internal Server Error',
            time: expect.stringContaining(''),
            error: expect.stringContaining(''),

        });
    });
    test('POST /auth/login ', async () => {
        const response = await request(app).post('/auth/login').send({
            name: 'Rajesh Si',
            password: 'rajesh@789',
        });
        expect(response.status).toBe(401);
        expect(response.body).toEqual({
            status: false,
            message: 'Invalid credentials1',

        });
    });
    test('POST /auth/login success', async () => {
        const response = await request(app).post('/auth/login').send({
            email: 'rajesh.singh@example.com',
            password: 'rajesh@789',
        });
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            status: '200',
            message: 'login successfull',
            data: expect.objectContaining({}),
            token: expect.stringContaining(''),

        });
    });
    test('POST /auth/login failure', async () => {
        await server.disconnectDB();
        const response = await request(app).post('/auth/login').send({
            email: 'rajesh.singh@example.com',
            password: 'rajesh@7',
        });
        expect(response.status).toBe(500);
        expect(response.body).toEqual({
            status: '500',
            message: ' Internal Server Error',
            time: expect.stringContaining(''),
            error: expect.objectContaining({}),
        });
    });
    test('DELETE  success', async () => {
        let response = await request(app).delete('/user/deleteUser/rajesh.singh@example.com');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            status: 'success',
            data: expect.objectContaining({}),
            time: expect.stringContaining(''),

        });
        response = await request(app).delete('/user/deleteUser/rajesh.singh@example.com');
        expect(response.status).toBe(404);
        expect(response.body).toEqual({
            status: 'not found',
            message: 'User not found',

        });
        await server.disconnectDB();
        response = await request(app).delete('/user/deleteUser/rajesh.singh@example.com');
        expect(response.status).toBe(500);
        expect(response.body).toEqual({
            status: 'error',
            message: 'Internal Server Error',
            time: expect.stringContaining(''),
            error: expect.stringContaining(''),

        });
    });
});
