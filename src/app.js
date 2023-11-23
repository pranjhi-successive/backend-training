import express from "express";
import { authenticateJWT } from "./modules/Authentication.js";
import { Data } from "./utils/MockData.js";
import validateRequest, { userSchema } from "./modules/validation.js";
import createError from "http-errors";

const app = express();
app.use(express.json());

//Middleware error handling
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ error: err.message });
});
//endpoints
app.get("/", (req, res) => {
  res.send("Hello Welcome");
});

//endpoints for authentication
app.get("/data", authenticateJWT, (req, res) => {
  res.send(Data);
});

app.post("/mock", authenticateJWT, (req, res) => {
  const newData = req.body;
  Data.push(newData);
  res.send(Data);
});
//401 Error
app.get("/secure", authenticateJWT, (req, res) => {
  if (!authenticateJWT) {
    next(createError(401, " User not authenticated"));
  } else {
    res.json({ message: "Access granted", user: req.user });
  }
});

app.get("/protected", authenticateJWT, (req, res) => {
  res.json({
    message: "You have access to this protected route!",
    user: req.user,
  });
});

// Sample route with validation middleware
app.post("/users", validateRequest(userSchema), (req, res) => {
  // Process the request only if it passes validation
  const user = req.body;
  // Your logic to handle the validated user data
  res.json({ message: "User created successfully", user });
});

//404 Not Found Error
app.get("/not-found", (req, res, next) => {
  next(createError(404, "Not Found: The requested resource does not exist"));
});

//400 Bad request error
app.get("/bad-request", (req, res, next) => {
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
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
