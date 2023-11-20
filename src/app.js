import express from 'express';
import { authenticateJWT } from './modules/Authentication.js';
import { Data } from './utils/MockData.js';
import validateRequest, { userSchema } from './modules/validation.js';


const app = express();
app.use(express.json());
//endpoints
app.get('/', (req, res) => {
  res.send('Hello Welcome');
});

//endpoints for authentication
app.get('/data', authenticateJWT,(req, res) => {
  res.send(Data);
});

app.post('/mock',authenticateJWT, (req, res) => {
  const newData = req.body;
  Data.push(newData);
  res.send(Data);
});
app.get('/secure', authenticateJWT, (req, res) => {
  res.json({ message: 'Access granted', user: req.user });
});

app.get('/protected', authenticateJWT, (req, res) => {
  res.json({ message: 'You have access to this protected route!', user: req.user });
});

// Sample route with validation middleware
app.post('/users', validateRequest(userSchema), (req, res) => {
  // Process the request only if it passes validation
  const user = req.body;
  // Your logic to handle the validated user data
  res.json({ message: 'User created successfully', user });
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
