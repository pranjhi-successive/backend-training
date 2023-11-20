import jwt from 'jsonwebtoken';

// Secret key for JWT 
const secretKey = 'hello';

// Middleware function for authentication which returns json
export const authenticateJWT = (req, res, next) => {
  const token = req.header('auth');

  if (!token) {
    return res.status(401).json({ message: 'Please enter token' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, secretKey);
    // Attach the user information to the request
    req.user = decoded;
    // Move to the next middleware or route handler
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid token' });
  }
};


