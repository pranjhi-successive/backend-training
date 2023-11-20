import express from 'express';
import { authenticateJWT } from './modules/Authentication.js';
import { Data } from './utils/MockData.js';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello Welcome');
});

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


app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
