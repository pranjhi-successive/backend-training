import express from "express";
import { authenticateJWT } from "./middleware/Authentication.js";
import { Data } from "./utils/MockData.js";
import logger from "./middleware/Logger.js";
import addCustomHeader from "./middleware/CustomHeasder.js";
import rateLimiterMiddleware from "./middleware/limiter.js";

const app = express();

app.use(express.json());
app.use(rateLimiterMiddleware);
app.use(addCustomHeader('hello', 'header12345'));
app.use(addCustomHeader('helloworld', 'header12345ferf'));

app.use(logger);

app.get("/", (req, res) => {
  res.send("Hello Welcome");
});

app.get("/data", authenticateJWT, (req, res) => {
  res.send(Data);
});

app.post("/mock", authenticateJWT, (req, res) => {
  const newData = req.body;
  Data.push(newData);
  res.send(Data);
});
app.get("/secure", authenticateJWT, (req, res) => {
  res.json({ message: "Access granted", user: req.user });
});

app.get("/protected", authenticateJWT, (req, res) => {
  res.json({
    message: "You have access to this protected route!",
    user: req.user,
  });
});

app.get('/example', (req, res, next) => {
  try {
    throw new Error('This is a sample error');
  } catch (error) {
    next(error);
  }
});
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: {
      message: err.message || 'Internal Server Error',
    },
  });
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
