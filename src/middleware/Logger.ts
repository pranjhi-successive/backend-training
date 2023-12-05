import { Request, Response, NextFunction } from "express";

import { Router } from "express";

class Logger {
  path: string;
  public router = Router();
  private log = (req: Request, res: Response, next: NextFunction) => {
    const timeStamp = new Date();
    console.log(`${timeStamp} ${req.method} ${req.url} ${req.ip}`);
    next();
  };
  constructor() {
    this.path = "/logger";
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, this.log, this.getTime);
  }

  private getTime = (req: Request, res: Response) => {
    res.status(200).json({
      status: "OK",
      message: " Time  is passed successfully",
      time: new Date(),
    });
  };
}
export default Logger;
