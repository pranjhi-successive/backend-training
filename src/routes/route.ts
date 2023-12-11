import express, { Request, Response, NextFunction } from "express";
import createError from "http-errors";
import {
  addCustomHeader,
  logger,
  rateLimiterMiddleware,
  validateRequest,
  validateRegistration,
  authenticateJWT,
  validateRequest2,
  validationMiddlewareRequest,
  Data,
  userSchema,
  ipCheckMiddleware,
  validateNumeric,
} from "../middleware/index.js";
import { any } from "joi";

const router = express.Router();

router.use(rateLimiterMiddleware);
router.use(addCustomHeader("hello", "header12345"));
router.use(addCustomHeader("helloworld", "header12345ferf"));
router.use(logger);

router.use("/user", validationMiddlewareRequest);
router.use("/post", validationMiddlewareRequest);

router.post("/user", (req: Request, res: Response) => {
  res.json({ message: "User route handled successfully" });
});

router.post("/post", (req: Request, res: Response) => {
  res.json({ message: "Post route handled successfully" });
});

router.get("/ip", ipCheckMiddleware, (req: Request, res: Response) => {
  res.status(200).send({
    status: true,
    message: "IP test completed!",
  });
});

router.get("/", (req: Request, res: Response) => {
  res.send("Hello Welcome");
});

router.get("/asynchronouserror", async (req, res, next) => {
  try {
    setTimeout(() => {
      throw new Error('Hello Async Error');
    }, 3000);
  } catch (error) {
    next(error);
  }
});

router.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something went wrong!, Please try after sometime. ',
  });
});

router.get("/secure", authenticateJWT, (req: Request, res: Response, next: NextFunction) =>{
  if (!req.body.user) {
    next(createError(401, "User not authenticated"));
  } else {
    res.json({ message: "Access granted", user: req.body.user });
  }
});

router.get("/protected", authenticateJWT, (req: Request, res: Response) => {
  res.json({
    message: "You have access to this protected route!",
    user: req.body.user,
  });
});

router.get("/not-found", (req, res, next) => {
  next(createError(404, "Not Found: The requested resource does not exist"));
});

router.get("/bad-request", (req, res, next) => {
  const missingParameter = req.query.param;
  if (!missingParameter) {
    next(createError(400, " Missing required parameter"));
  } else {
    res.json({
      message: "Success",
    });
  }
});

router.get("/example", (req, res, next) => {
  try {
    throw new Error("This is a sample error");
  } catch (error) {
    next(error);
  }
});

router.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    error: {
      message: err.message || "Internal Server Error",
    },
  });
});

router.post("/users", validateRequest(userSchema), (req: Request, res: Response) => {
  const user = req.body;
  res.json({ message: "User created successfully", user });
});

router.post("/register", validateRegistration, (req: Request, res: Response) => {
  res.status(200).json({ message: "Registration successful" });
});

router.post("/route", validateRequest2, (req: Request, res: Response) => {
  const { a1, a2 } = req.body;
  res.json({ message: "Accessed successfully!", a1, a2 });
});

router.post("/secondRoute", validateRequest2, (req: Request, res: Response) => {
  const { a3 } = req.body;
  res.json({ message: "Accessed successfully!", a3 });
});

router.get("/numeric", validateNumeric, (req: Request, res: Response) => {
  res.send(req.query);
});

export default router;
