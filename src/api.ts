import express, { Application, Request, Response, NextFunction } from 'express';
import path from 'path';
import fs from 'fs';
import { errorHandler } from './api/middlewares/errorHandler';

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const routesPath = path.join(__dirname, 'api/routes');
fs.readdirSync(routesPath).forEach(file => {
  if (/\.js$/.test(file)) {
    const route = require(path.join(routesPath, file));
    const routePrefix = '/' + file.replace('.js', '');
    app.use(routePrefix, route.default);
  }
});

app.use(errorHandler);

app.get('/', (_req: Request, res: Response) => {
  res.send('API Express Server is running!');
});


export default app;