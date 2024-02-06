import express, { Request, Response } from 'express';
import {
    AddCustomHeaderMiddleware,
    AuthMiddleware,
    IpVerification,
    Logger,
    RateLimiter,
    SchemaValidation,
    ValidateNumericMiddleware,
    Validation,
    ValidationMiddleware,
} from '.';

const middlewareRouter = express.Router();
middlewareRouter.use(express.json());
const authMiddleware = new AuthMiddleware('hello');

middlewareRouter.get(authMiddleware.path, authMiddleware.authenticateJWT, (req, res) => {
    res.send('secret');
});

const addCustomHeaderMiddleware = new AddCustomHeaderMiddleware(
    'hello',
    'header12345',
);
middlewareRouter.get(
    addCustomHeaderMiddleware.path,
    addCustomHeaderMiddleware.addCustomHeader,
    (req, res) => {
        res.send('successfully executed');
    },
);

const validation = new Validation();
middlewareRouter.post(
    validation.userpath,
    Validation.validationMiddlewareRequest,
    (req: Request, res: Response) => {
        res.json({ message: 'User route handled successfully' });
    },
);

middlewareRouter.post(
    validation.postpath,
    Validation.validationMiddlewareRequest,
    (req: Request, res: Response) => {
        res.json({ message: 'Post route handled successfully' });
    },
);
const validationMiddleware = new ValidationMiddleware();
middlewareRouter.post(
    validationMiddleware.path,
    ValidationMiddleware.validateRegistration,
    (req: Request, res: Response) => {
        res.status(200).json({
            status: '200', message: 'Registration successful', time: new Date(), data: req.body,
        });
    },
);
const ipVerification = new IpVerification();

middlewareRouter.get(
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
middlewareRouter.get(rateLimiter.path, rateLimiter.router);

const logger = new Logger();
middlewareRouter.use(logger.router);

const validateNumericMiddleware = new ValidateNumericMiddleware();
middlewareRouter.get(
    validateNumericMiddleware.path,
    validateNumericMiddleware.router,
    (req: Request, res: Response) => {
        res.send(req.query);
    },
);
const schemaValidation = new SchemaValidation();
middlewareRouter.post(
    schemaValidation.path,
    SchemaValidation.validateRequest(schemaValidation.userSchema),
    (req: Request, res: Response) => {
        const user = req.body;
        res.json({ message: 'User created successfully', user });
    },
);

export default middlewareRouter;
