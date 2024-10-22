import express from "express";
import cookieParser from "cookie-parser"
import cors from "cors";
import config from './config.js';
import connectDB from './database/db.js';
import { errorHandler } from "./utils/errorHandler.js";
import routes from './routes/index.js';

const { PORT } = config || 8080;

const app = express();

// Middleware's
app.use(cors());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(errorHandler);

// Routes
app.use('/api/v1', routes);

// Initialize application
const httpServer = app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

connectDB();