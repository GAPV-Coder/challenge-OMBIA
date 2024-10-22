import mongoose from 'mongoose';

const carSchema = new mongoose.Schema({
    originalPosition: { type: Number, required: true },
    parkedPosition: { type: Number, default: null },
    parkingProcessedAt: { type: Date, default: null }
});

const Car = mongoose.model('Car', carSchema);

export default Car;
