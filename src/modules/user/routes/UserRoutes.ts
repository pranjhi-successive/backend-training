import { Router } from 'express';
import Controller from '../Controller';
import AuthMiddleware from '../../mobile/authenticateMiddleware';

const userRouter = Router();
const controller = new Controller();
/**
 * @swagger
 * /api/users/create:
 *   post:
 *     tags:
 *       - Users
 *     summary: Create a new user
 *     description: Create a new user using the provided data.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - username
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             example:
 *               status: success
 *               message: Data added successfully
 *               data:
 *               time: "2024-01-24T00:00:00Z"
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             example:
 *               status: 400
 *               message: validation error
 *               time: "2024-01-24T00:00:00Z"
 *               error: "Validation error details"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               status: error
 *               time: "2024-01-24T00:00:00Z"
 *               error: "Internal Server Error"
 */

userRouter.post('/create', controller.create);
/**
 * @swagger
 * /user/email/{email}:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get user by email
 *     description: Retrieve a user based on their email address.
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         description: User's email address
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *
 *       404:
 *         description: User not found
 *
 *       500:
 *         description: Internal Server Error
 *
 */

userRouter.get('/email/:email', controller.getByEmail);
/**
 * @swagger
 * /user/all:
 *    get:
 *      tags:
 *        - Users
 *      summary: Return all users
 *      responses:
 *        '200':
 *          description: A list of users
 */
userRouter.get('/all', controller.getAll);
/**
 * @swagger
 * /api/users/deleteuser/{email}:
 *   delete:
 *     tags:
 *       - Users
 *     summary: Delete a user by email
 *     description: Delete a user based on their email address.
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         description: User's email address
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               status: success
 *               data:
 *               time: "2024-01-24T00:00:00Z"
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             example:
 *               status: not found
 *               message: User not found
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               status: error
 *               message: Internal Server Error
 *               time: "2024-01-24T00:00:00Z"
 *               error: "Error message details"
 */

userRouter.delete('/deleteuser/:email', controller.delete);
userRouter.get('/token', AuthMiddleware.authenticateToken, controller.getToken);

export default userRouter;
