import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { UserRoutes } from '../src/app/modules/user.route';

const app: Application = express();

app.use(express.json());
app.use(cors());

// application routes
app.use('/', UserRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

export default app;
