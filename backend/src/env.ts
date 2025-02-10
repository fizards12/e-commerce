import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT || 3000;
export const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017';
export const JWT_SECRET = process.env.JWT_SECRET || 'hello_world';
export const SALTS_ROUNDS = +(process.env.SALTS_ROUNDS || 12);
export const PRODUCTION_ENV = "PROD";
export const DEVELOPMENT_ENV = "DEV";
export const NODE_ENV = process.env.NODE_ENV || DEVELOPMENT_ENV;
if (!MONGO_URI || !JWT_SECRET) {
    throw new Error('Missing environment variables');
}