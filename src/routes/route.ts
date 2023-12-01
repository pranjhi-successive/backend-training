import express from "express";
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
import { Request, Response, NextFunction } from 'express';
const router = express.Router();

router.use(rateLimiterMiddleware);
router.use(addCustomHeader("hello", "header12345"));
router.use(addCustomHeader("helloworld", "header12345ferf"));
router.use(logger);

// router.use("/user", validationMiddlewareRequest);
// router.use("/post", validationMiddlewareRequest);

router.post("/user", validationMiddlewareRequest, (req:Request,res:Response) => {
  res.json({ message: "User route handled successfully" });
});

router.post("/post", validationMiddlewareRequest, (req:Request,res:Response) => {
  res.json({ message: "Post route handled successfully" });
});
router.get("/ip", ipCheckMiddleware,  (req:Request,res:Response)=> {
    res.status(200).send({
      status: true,
      message: "IP test completed!",
    });
  });
//endpoints
router.get("/", (req:Request,res:Response) => {
  res.send("Hello Welcome");
});

//endpoints for authentication
router.get("/data", authenticateJWT, (req:Request,res:Response) => {
  res.send(Data);
});

router.post("/mock", authenticateJWT, (req:Request,res:Response) => {
  const newData = req.body;
  Data.push(newData);
  res.send(Data);
});
router.get("/secure", authenticateJWT, (req:Request,res:Response) => {
  res.json({ message: "Access granted", user: req.body.user });
});

router.get("/protected", authenticateJWT, (req:Request,res:Response) => {
  res.json({
    message: "You have access to this protected route!",
    user: req.body.user,
  });
});

router.get("/example", (req:Request,res:Response, next:NextFunction) => {
  try {
    throw new Error("This is a sample error");
  } catch (error) {
    next(error);
  }
});
router.use((err:any, req:Request, res:Response, next:NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    error: {
      message: err.message || "Internal Server Error",
    },
  });
});

router.post("/users", validateRequest(userSchema), (req:Request,res:Response) => {
  const user = req.body;
  res.json({ message: "User created successfully", user });
});
router.post("/register", validateRegistration, (req:Request,res:Response) => {
  res.status(200).json({ message: "Registration successful" });
});
router.post("/route", validateRequest2, (req:Request,res:Response) => {
  const { a1, a2 } = req.body;
  res.json({ message: " accessed successfully!", a1, a2 });
});

router.post("/secondRoute", validateRequest2, (req:Request,res:Response) => {
  const { a3 } = req.body;
  res.json({ message: "accessed successfully!", a3 });
});

router.get("/numeric",validateNumeric,(req:Request,res:Response)=>{
  res.send(req.query);
})

export default router;
