import { Request, Response, NextFunction, Router } from "express";

class ValidateNumericMiddleware {
  path: string;
  public router = Router();
  public validateNumeric = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const numeric = ["parameter1", "parameter2"];
    for (const param of numeric) {
      if (req.query[param] && isNaN(Number(req.query[param]))) {
        return res
          .status(400)
          .json({ error: `invaid for ${param} must be numeric` });
      }
    }
    next();
  };
  constructor() {
    this.path = "/numeric";
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, this.getnumeric);
  }

  private getnumeric = (req: Request, res: Response) => {
    res.status(200).json({
      status: "OK",
      message: " successfully executed",
      time: new Date(),
    });
  };
}
export default ValidateNumericMiddleware;
