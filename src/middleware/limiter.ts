import { Response, Request, Router } from "express";
import rateLimit from "express-rate-limit";

class RateLimiter {
  path: string;
  public router = Router();

  private limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // for 10 minutes
    max: 100, // requests per windowMs for each IP
    message: "Please try again after some time",
  });

  constructor() {
    this.path = "/rate-limit";
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, this.limiter, this.getLimit);
  }

  private getLimit = (req: Request, res: Response) => {
    res
      .status(200)
      .json({ status: "OK", message: " limit is passed successfully" });
  };
}

export default RateLimiter;
