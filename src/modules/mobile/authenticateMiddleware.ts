import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

interface AuthenticatedRequest extends Request {
  user?: any;
}

const secretKey = 'hello';
class AuthMiddleware {
    static authenticateToken = async (req: AuthenticatedRequest, res: Response, next: any):
     Promise<any> => {
        const token = req.header('Authorization')?.split(' ')[1];

        if (!token) {
            res.status(401).json({ error: 'Access denied. Token not provided' });
            return;
        }

        try {
            const decoded : any = jwt.verify(token, secretKey);
            req.body.userId = decoded.userId;
            next();
        } catch (err) {
            res.status(403).json({ error: 'Invalid token' });
        }
    };
}
export default AuthMiddleware;
