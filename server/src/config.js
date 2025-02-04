import dotenv from 'dotenv';
dotenv.config();

const config = {
    PORT: process.env.PORT,
    DB_URL: process.env.MONGODB_URI,
};

export default config;
