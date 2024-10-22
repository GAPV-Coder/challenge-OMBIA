import { Router } from 'express';
import carsRouter from '../routes/cars.routes.js';

const routerApi = Router();

routerApi.use('/cars', carsRouter);

export default routerApi;