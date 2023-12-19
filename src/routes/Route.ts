import express, { type Request, type Response } from 'express';
// import bodyParser from "body-parser";
import {
    AuthMiddleware,
    HealthCheck,
    IpVerification,
    Logger,
    RateLimiter,
    SchemaValidation,
    ValidateNumericMiddleware,
    Validation,
    ValidationMiddleware,
    AddCustomHeaderMiddleware,
} from '../middleware/index';
import CountryController from '../modules/country/controller/Country';
// import { MobileController } from "../modules/mobile/controller/Mobile";
import mobileRouter from '../modules/mobile/route';
import userRouter from '../modules/user/UserRoutes';
import authController from '../modules/user/controller/AuthController';

const router = express.Router();

const authMiddleware = new AuthMiddleware('hello');

router.get(authMiddleware.path, authMiddleware.authenticateJWT, (req, res) => {
    res.send('secret');
});

const addCustomHeaderMiddleware = new AddCustomHeaderMiddleware(
    'hello',
    'header12345',
);
router.get(
    addCustomHeaderMiddleware.path,
    addCustomHeaderMiddleware.addCustomHeader,
    (req, res) => {
        res.send('successfully executed');
    },
);

const validation = new Validation();
router.post(
    validation.userpath,
    Validation.validationMiddlewareRequest,
    (req: Request, res: Response) => {
        res.json({ message: 'User route handled successfully' });
    },
);

router.post(
    validation.postpath,
    Validation.validationMiddlewareRequest,
    (req: Request, res: Response) => {
        res.json({ message: 'Post route handled successfully' });
    },
);
const validationMiddleware = new ValidationMiddleware();
router.post(
    validationMiddleware.path,
    ValidationMiddleware.validateRegistration,
    (req: Request, res: Response) => {
        res.status(200).json({
            status: '200', message: 'Registration successful', time: new Date(), data: req.body,
        });
    },
);
const healthCheck = new HealthCheck();
router.get(healthCheck.path, HealthCheck.getHealth);
const ipVerification = new IpVerification();

router.get(
    ipVerification.path,
    IpVerification.ipCheckMiddleware,
    (req: Request, res: Response) => {
        res.status(200).send({
            status: true,
            message: 'IP test completed!',
        });
    },
);
const rateLimiter = new RateLimiter();
router.get(rateLimiter.path, rateLimiter.router);

const logger = new Logger();
router.use(logger.router);

const validateNumericMiddleware = new ValidateNumericMiddleware();
router.get(
    validateNumericMiddleware.path,
    validateNumericMiddleware.router,
    (req: Request, res: Response) => {
        res.send(req.query);
    },
);
const schemaValidation = new SchemaValidation();
router.post(
    schemaValidation.path,
    SchemaValidation.validateRequest(schemaValidation.userSchema),
    (req: Request, res: Response) => {
        const user = req.body;
        res.json({ message: 'User created successfully', user });
    },
);
const countryController = new CountryController();
router.post('/addPlayer', async (req, res) => {
    await countryController.addPlayer(req, res);
});
router.post('/name', async (req, res) => {
    await countryController.getCountryByName(req, res);
});
router.use('/user', userRouter);
router.use('/auth', authController);
router.use('/api', mobileRouter);

export default router;
