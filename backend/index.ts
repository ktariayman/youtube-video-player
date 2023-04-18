import dotenv from 'dotenv';
dotenv.config();
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import videoRouter from './routes/video';
const app: Application = express();
app.use(cors());
app.use(express.json());

app.use('/videos', videoRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log('server us listinig', PORT);
});
