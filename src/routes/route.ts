import express from "express";

import { Request, Response, NextFunction } from "express";
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
} from "../middleware/index";

const router = express.Router();

const authMiddleware = new AuthMiddleware("hello");

router.get(authMiddleware.path, authMiddleware.authenticateJWT, (req, res) => {
  res.send("secret");
});

const addCustomHeaderMiddleware = new AddCustomHeaderMiddleware(
  "hello",
  "header12345"
);
router.get(
  addCustomHeaderMiddleware.path,
  addCustomHeaderMiddleware.addCustomHeader,
  (req, res) => {
    res.send("successfully executed");
  }
);

const validation = new Validation();
router.post(
  validation.userpath,
  validation.validationMiddlewareRequest,
  (req: Request, res: Response) => {
    res.json({ message: "User route handled successfully" });
  }
);

router.post(
  validation.postpath,
  validation.validationMiddlewareRequest,
  (req: Request, res: Response) => {
    res.json({ message: "Post route handled successfully" });
  }
);
const validationMiddleware = new ValidationMiddleware();
router.post(
  validationMiddleware.path,
  validationMiddleware.validateRegistration,
  (req: Request, res: Response) => {
    res.status(200).json({ message: "Registration successful" });
  }
);
const healthCheck = new HealthCheck();
router.get(healthCheck.path, healthCheck.getHealth);
const ipVerification = new IpVerification();

router.get(
  ipVerification.path,
  ipVerification.ipCheckMiddleware,
  (req: Request, res: Response) => {
    res.status(200).send({
      status: true,
      message: "IP test completed!",
    });
  }
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
  }
);
const schemaValidation = new SchemaValidation();
router.post(
  schemaValidation.path,
  schemaValidation.validateRequest(schemaValidation.userSchema),
  (req: Request, res: Response) => {
    const user = req.body;
    res.json({ message: "User created successfully", user });
  }
);

export default router;
