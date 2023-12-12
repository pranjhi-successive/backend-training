import express, { type Request, type Response } from "express";
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
} from "../middleware/index";
import CountryController from "../modules/country/controller/Country";
import CountryService from "../modules/country/services/Country";
// import { MobileController } from "../modules/mobile/controller/Mobile";
import mobileRouter from "../modules/mobile/route";

const router = express.Router();

const authMiddleware = new AuthMiddleware("hello");

router.get(authMiddleware.path, authMiddleware.authenticateJWT, (req, res) => {
  res.send("secret");
});

const addCustomHeaderMiddleware = new AddCustomHeaderMiddleware(
  "hello",
  "header12345",
);
router.get(
  addCustomHeaderMiddleware.path,
  addCustomHeaderMiddleware.addCustomHeader,
  (req, res) => {
    res.send("successfully executed");
  },
);

const validation = new Validation();
router.post(
  validation.userpath,
  validation.validationMiddlewareRequest,
  (req: Request, res: Response) => {
    res.json({ message: "User route handled successfully" });
  },
);

router.post(
  validation.postpath,
  validation.validationMiddlewareRequest,
  (req: Request, res: Response) => {
    res.json({ message: "Post route handled successfully" });
  },
);
const validationMiddleware = new ValidationMiddleware();
router.post(
  validationMiddleware.path,
  validationMiddleware.validateRegistration,
  (req: Request, res: Response) => {
    res.status(200).json({ message: "Registration successful" });
  },
);
const healthCheck = new HealthCheck();
router.get(healthCheck.path, healthCheck.getHealth);
const ipVerification = new IpVerification();

router.get(
  ipVerification.path,
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  ipVerification.ipCheckMiddleware,
  (req: Request, res: Response) => {
    res.status(200).send({
      status: true,
      message: "IP test completed!",
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
  schemaValidation.validateRequest(schemaValidation.userSchema),
  (req: Request, res: Response) => {
    const user = req.body;
    res.json({ message: "User created successfully", user });
  },
);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const countryService = new CountryService();
const countryController = new CountryController();

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.post("/addPlayer", async (req, res) => {
  await countryController.addPlayer(req, res);
});
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.post("/name", async (req, res) => {
  await countryController.getCountryByName(req, res);
});
// router.use(bodyParser.json());

// const mobileController = new MobileController();

// // eslint-disable-next-line @typescript-eslint/no-misused-promises
// router.get("/api/mobiles", async (req, res) => {
//   try {
//     await mobileController.getAllMobiles(req, res);
//   } catch (error) {
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });
router.use("/api", mobileRouter);
export default router;
