import { Request, Response, NextFunction, Router } from "express";

class AddCustomHeaderMiddleware {
  path: string;
  private headerName: string;
  private headerValue: string;
  constructor(headerName: string, headerValue: string) {
    this.headerName = headerName;
    this.headerValue = headerValue;
    this.path = "/header";
  }

  public addCustomHeader = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    res.header(this.headerName, this.headerValue);
    next();
  };
}
export default AddCustomHeaderMiddleware;
