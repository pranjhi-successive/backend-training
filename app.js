import  express  from 'express'
import {data} from './mockData.js'
const app = express()
app.get('/',(req, res) =>{
  res.send('Hello World')
})
app.get('/data',(req, res)=> {
    res.send(data);
  })

app.listen(3000)