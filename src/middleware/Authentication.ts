import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

// Secret key for JWT
class AuthMiddleware {
  path: string;
  secretKey: string;

  constructor(secretKey: string) {
    this.secretKey = secretKey;
    this.path = "/protected";
    this.secretKey = "hello";
  }
  // Middleware function for authentication which returns json
  public authenticateJWT = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const token = req.headers["authorization"]?.split(" ")[0];

    if (!token) {
      return res.status(401).json({ message: "Please enter token" });
    }

    try {
      // Verify the token
      const decoded = jwt.verify(token, this.secretKey);
      // Attach the user information to the request
      req.body.user = decoded;
      // Move to the next middleware or route handler
      next();
    } catch (error) {
      return res.status(403).json({ message: "Invalid token" });
    }
  };
}
export default AuthMiddleware;
