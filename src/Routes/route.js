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