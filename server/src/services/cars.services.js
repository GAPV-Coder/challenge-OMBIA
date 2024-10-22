import Car from '../models/cars.module.js';

export const getWaitingCars = async () => {
    try {
        const cars = await Car.find({ parkedPosition: null });
        return cars;
    } catch (error) {
        throw new Error('Error getting cars on standby');
    }
};

export const createWatingCar = async (originalPosition) => {
    try {
        const newCar = new Car({ originalPosition });
        const savedCar = await newCar.save();
        return savedCar;
    } catch (error) {
        throw new Error('Error creating a waiting car');
    }
};

export const processParkingPositions = async () => {
    try {
        const waitingCars = await getWaitingCars();

        const vacantPositions = [...Array(10).keys()].map((i) => i + 11);
        for (
            let i = 0;
            i < waitingCars.length && i < vacantPositions.length;
            i++
        ) {
            waitingCars[i].parkedPosition = vacantPositions[i];
            waitingCars[i].parkingProcessedAt = new Date();
            await waitingCars[i].save();
        }

        return waitingCars;
    } catch (error) {
        throw new Error('Error when processing parking positions');
    }
};

export const handleParkingLogic = async () => {
    try {
        const parkedCars = await processParkingPositions();
        return parkedCars;
    } catch (error) {
        throw new Error('Error in the parking logic');
    }
};

export const getProcessedParkinList = async (page = 1, limit = 10) => {
    try {
        const skip = (page - 1) * limit;

        const processedCars = await Car.find({
            parkingProcessedAt: { $ne: null },
        })
            .skip(skip)
            .limit(limit)
            .sort({ parkingProcessedAt: -1 });

        const totalProcessed = await Car.countDocuments({
            parkingProcessedAt: { $ne: null },
        });

        return {
            cars: processedCars,
            totalPages: Math.ceil(totalProcessed / limit),
            currentPage: page,
        };
    } catch (error) {
        throw new Error('Error in obtaining the list of parking processings');
    }
};
