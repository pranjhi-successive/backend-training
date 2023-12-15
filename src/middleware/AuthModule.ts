// middlewares/authMiddleware.ts
import jwt from 'jsonwebtoken';

interface DecodedToken {
  userId: string;
}

export const generateToken = (userId: string): string => jwt.sign({ userId }, 'hello', { expiresIn: '1h' });

export const verifyToken = (token: string): DecodedToken => jwt.verify(token, 'hello') as DecodedToken;

export const authenticateUser = (req: any, res: any, next: any): void => {
    const token: string = req.header('Authorization');

    if (!token) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }

    try {
        const decoded: DecodedToken = verifyToken(token);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Unauthorized' });
    }
};
