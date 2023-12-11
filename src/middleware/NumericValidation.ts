import {
  type Request,
  type Response,
  type NextFunction,
  Router,
} from "express";

class ValidateNumericMiddleware {
  path: string;
  public router = Router();
  public validateNumeric = (
    req: Request,
    res: Response,
    next: NextFunction,
  ): any => {
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

  private initializeRoutes(): void {
    this.router.get(this.path, this.getnumeric);
  }

  private readonly getnumeric = (req: Request, res: Response): void => {
    res.status(200).json({
      status: "OK",
      message: " successfully executed",
      time: new Date(),
    });
  };
}
export default ValidateNumericMiddleware;
