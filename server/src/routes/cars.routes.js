import express from 'express';
import { addCardToQueque, getCarsInQueque, getProcessedParkingListController, processParking } from '../controllers/cars.controller.js';

const router = express.Router();

router.get('/waiting', getCarsInQueque);

router.post('/add-car-to-queque', addCardToQueque);

router.post('/process-parking', processParking);

router.get('/processed-parking-list', getProcessedParkingListController);

export default router;