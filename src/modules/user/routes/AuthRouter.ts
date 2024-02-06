import Router from 'express';
import Controller from '../Controller';

const authRouter = Router();

const controller = new Controller();
/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: User Signup
 *     description: Register a new user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             example:
 *               status: 200
 *               message: user created
 *               token: "your-generated-token"
 *               user:
 *               time: "2024-01-24T00:00:00Z"
 *       400:
 *         description: User already exists
 *         content:
 *           application/json:
 *             example:
 *               status: 400
 *               message: user exists already
 *               time: "2024-01-24T00:00:00Z"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               status: 500
 *               message: Internal Server Error
 *               time: "2024-01-24T00:00:00Z"
 */

authRouter.post('/signup', controller.signup);
/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: User Login
 *     description: Authenticate a user and generate a token for login.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             example:
 *               status: 200
 *               message: login successful
 *               data:
 *               token: "your-generated-token"
 *       401:
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: Invalid credentials
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               status: 500
 *               message: Internal Server Error
 *               time: "2024-01-24T00:00:00Z"
 *               error: "Error message details"
 */

authRouter.post('/login', controller.login);

export default authRouter;
