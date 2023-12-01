import rateLimit from "express-rate-limit";
const rateLimiterMiddleware = rateLimit({
  windowMs: 10 * 60 * 1000, //for 10 minutes
  max: 100, //for ip
  message: "please try again after some time",
});
export default rateLimiterMiddleware;
