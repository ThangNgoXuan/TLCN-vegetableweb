import express from 'express';
import connectDB from './config/db.js';
import { env } from './config/environment.js';
import { apiv1 } from './routers/index.js';

connectDB();

const app = express();
const port = 5000;

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

app.use('/v1', apiv1);

app.get('/v1/config/paypal', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || 'sb')
})

app.listen(port, () => {
  console.log(`App listening at http://${env.HOST}:${port}`);
});