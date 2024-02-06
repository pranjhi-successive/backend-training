/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express';
import MobileController from './Controller';
import Validation from './validation';
import AuthMiddleware from './authenticateMiddleware';

const mobileRouter = express.Router();
mobileRouter.use(express.json());

const mobileController = new MobileController();
/**
 * @swagger
 * /api/mobiles:
 *    get:
 *      tags:
 *        - Mobile Listing
 *      summary: Return all mobiles
 *      responses:
 *        '200':
 *          description: success
 *        '500':
 *          description: Internal server error
 */
mobileRouter.get('/mobiles', mobileController.getAllMobiles);
/**
 * @swagger
 * /api/mobiles/{id}:
 *    delete:
 *     tags:
 *        - Mobile Listing
 *     summary: delete mobile by id
 *     description: Delete a mobile based on their id.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Mobile id
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Internal Server Error
 */
mobileRouter.delete('/mobiles/:id', AuthMiddleware.authenticateToken, mobileController.deleteMobileById);
/**
 * @swagger
 * /api/mobiles/create:
 *   post:
 *     tags:
 *       - Mobile Listing
 *     summary: Create a new mobile
 *     description: Create a new mobile using the provided data.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               modelName:
 *                 type: string
 *               brand:
 *                 type: string
 *             required:
 *               - modelName
 *               - brand
 *     responses:
 *       201:
 *         description: Mobile created successfully
 *         content:
 *           application/json:
 *             example:
 *               status: success
 *               data:
 *               time: "2024-01-24T00:00:00Z"
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

mobileRouter.post('/create', Validation.create, mobileController.createMobile);
/**
 * @swagger
 * /api/{id}:
 *    get:
 *     tags:
 *        - Mobile Listing
 *     summary: Return all users
 *     description: Retrieve a mobile based on their id.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Mobile's id
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *
 *       404:
 *         description: this mobile doesnot exist
 *
 *       500:
 *         description: Internal Server Error
 */
mobileRouter.get('/:id', mobileController.getById);
/**
 * @swagger
 * /api/mobiles/{modelNumber}:
 *    get:
 *     tags:
 *        - Mobile Listing
 *     summary: Return mobile by model number
 *     description: Retrieve a mobile based on their model number.
 *     parameters:
 *       - in: path
 *         name: model number
 *         required: true
 *         description: Mobile's model number
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Internal Server Error
 */

mobileRouter.get('/mobiles/:modelNumber', mobileController.getModelNumber);
/**
 * @swagger
 * /api/mobile/color/{color}:
 *    get:
 *     tags:
 *        - Mobile Listing
 *     summary: Return mobile by color
 *     description: Retrieve a mobile based on their color.
 *     parameters:
 *       - in: path
 *         name: color
 *         required: true
 *         description: Mobile's color
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Internal Server Error
 */

mobileRouter.get('/mobile/color/:color', mobileController.getMobilesByColor);

/**
 * @swagger
 * /api/mobile/{id}:
 *   put:
 *     tags:
 *       - Mobile Listing
 *     summary: Update mobile by ID
 *     description: Update mobile data based on the provided ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the mobile data to be updated
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               brand:
 *                 type: string
 *           example:
 *             name: Updated Mobile
 *             brand: Updated Brand
 *     responses:
 *       200:
 *         description: Successful response
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal Server Error
 */
mobileRouter.put('/mobile/:id', AuthMiddleware.authenticateToken, mobileController.updateMobileById);

export default mobileRouter;
