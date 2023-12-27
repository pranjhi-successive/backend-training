import { Request, Response } from "express";
import { string } from "joi";

class HealthCheck {
  path: string;

  constructor() {
    this.path = "/health";
  }
  public getHealth = (req: Request, res: Response) => {
    res.status(200).json({ status: "OK", message: "passed successfully" });
  };
}

export default HealthCheck;
