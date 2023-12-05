import { type Request, type Response, type NextFunction } from "express";
class IpVerification {
  path: string;
  constructor() {
    this.path = "/ip";
  }

  public ipCheckMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<any> => {
    const expectedIp = "::1";

    try {
      const clientIp = req.ip;

      if (clientIp !== expectedIp) {
        return res.status(403).send({
          status: false,
          message: "Forbidden: Access denied. Invalid IP address.",
        });
      }

      console.log("Valid Ip address!");
      next();
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        status: false,
        message: "Internal Server Error",
      });
    }
  };
}

export default IpVerification;
