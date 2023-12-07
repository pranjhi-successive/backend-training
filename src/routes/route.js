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

app.get('/asynchronouserror', async (req, res, next) => {
  try {
    setTimeout(() => {
      throw new Error('Hello Async Error');
    }, 3000);
  } catch (error) {
    next(error);
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!, Please try after sometime. ' });
});

//Assignment-5 question no-6 is same as question no 5 of assignment-4

//401 Error
router.get("/secure", authenticateJWT, (req, res) => {
  if (!authenticateJWT) {
    next(createError(401, " User not authenticated"));
  } else {
    res.json({ message: "Access granted", user: req.user });
  }
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

//404 Not Found Error
router.get("/not-found", (req, res, next) => {
  next(createError(404, "Not Found: The requested resource does not exist"));
});

//400 Bad request error
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

router.get("/numeric", validateNumeric, (req, res) => {
  res.send(req.query);
});

export default router;
