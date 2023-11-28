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

const router = express.Router();

router.use(rateLimiterMiddleware);
router.use(addCustomHeader("hello", "header12345"));
router.use(addCustomHeader("helloworld", "header12345ferf"));
router.use(logger);

router.use("/user", validationMiddlewareRequest);
router.use("/post", validationMiddlewareRequest);

router.post("/user", validationMiddlewareRequest, (req, res) => {
  res.json({ message: "User route handled successfully" });
});

router.post("/post", validationMiddlewareRequest, (req, res) => {
  res.json({ message: "Post route handled successfully" });
});
router.get("/ip", ipCheckMiddleware, function (req, res) {
    res.status(200).send({
      status: true,
      message: "IP test completed!",
    });
  });
//endpoints
router.get("/", (req, res) => {
  res.send("Hello Welcome");
});

//endpoints for authentication
router.get("/data", authenticateJWT, (req, res) => {
  res.send(Data);
});

router.post("/mock", authenticateJWT, (req, res) => {
  const newData = req.body;
  Data.push(newData);
  res.send(Data);
});
router.get("/secure", authenticateJWT, (req, res) => {
  res.json({ message: "Access granted", user: req.user });
});

router.get("/protected", authenticateJWT, (req, res) => {
  res.json({
    message: "You have access to this protected route!",
    user: req.user,
  });
});

router.get("/example", (req, res, next) => {
  try {
    throw new Error("This is a sample error");
  } catch (error) {
    next(error);
  }
});
router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: {
      message: err.message || "Internal Server Error",
    },
  });
});

router.post("/users", validateRequest(userSchema), (req, res) => {
  const user = req.body;
  res.json({ message: "User created successfully", user });
});
router.post("/register", validateRegistration, (req, res) => {
  res.status(200).json({ message: "Registration successful" });
});
router.post("/route", validateRequest2, (req, res) => {
  const { a1, a2 } = req.body;
  res.json({ message: " accessed successfully!", a1, a2 });
});

router.post("/secondRoute", validateRequest2, (req, res) => {
  const { a3 } = req.body;
  res.json({ message: "accessed successfully!", a3 });
});

router.get("/numeric",validateNumeric,(req,res)=>{
  res.send(req.query);
})

export default router;
