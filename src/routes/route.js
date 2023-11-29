import express from "express";
import { authenticateJWT, createError } from "./index.js";

const router=express.Router();

//Middleware error handling
router.use((err, req, res, next) => {
  res.status(err.status || 500).json({ error: err.message });
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
//we can generate all possible error codes like this as above
export default router;