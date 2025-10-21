import mongoose from 'mongoose';
import dotenv from 'dotenv';

const connectToMongoDB = async () => {
    dotenv.config();
    const { MONGODB_USER, MONGODB_PASSWORD, MONGODB_URL, MONGODB_DB, MONGODB_OPTIONS } = process.env;
    const mongoDbUrl = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_URL}/${MONGODB_DB}?${MONGODB_OPTIONS}`;
    try { 
        await mongoose.connect(mongoDbUrl)
        console.log ('Connected to Database');
    }catch (error) {
        console.error('Error connecting to Database:', error);
    }
};
export { connectToMongoDB };