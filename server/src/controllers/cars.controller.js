import { createWatingCar, getProcessedParkinList, getWaitingCars, handleParkingLogic } from "../services/cars.services.js";


export const getCarsInQueque = async (req, res) => {
    try {
        const cars = await getWaitingCars();
        res.status(200).json({
            message: "Cars in queue",
            data: cars
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const addCardToQueque = async (req, res) => {
    const { originalPosition } = req.body;
    try {
        const newCar = await createWatingCar(originalPosition);
        res.status(201).json({
            message: "Car added to queue",
            data: newCar
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const processParking = async (req, res) => {
    try {
        const parkedCars = await handleParkingLogic();
        res.status(200).json({
            message: "Cars parked",
            data: parkedCars
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getProcessedParkingListController = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const processedParking = await getProcessedParkinList(Number(page), Number(limit));
        res.status(200).json({
            message: "Processed parking list",
            data: processedParking
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};