import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import dotenv from 'dotenv';
import cors from 'cors';
import {leaderboardsRouter } from "./leaderboard/leaderboards.router";
import {errorHandler } from "../src/middleware/error.middleware";
import { notFoundHandler } from "../src/middleware/not-found.middleware";

dotenv.config();

const PORT: number = parseInt(process.env.PORT as string, 10) || 3000;
const app: Express = express();

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/leaderboards", leaderboardsRouter);


app.use(errorHandler);
app.use(notFoundHandler);


app.get('/', (req: Request, res: Response) => {
  res.send('<h1>Hello from the TypeScript world!</h1>');
});

app.listen(PORT, () => console.log(`Running on ${PORT} ⚡`));