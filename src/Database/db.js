import dotenv from 'dotenv';
dotenv.config();
import mongoose from "mongoose";

if (!process.env.DB_URI) {
    throw new Error("DB_URI is not defined in environment variables");
}

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URI);
        console.log("Database is connected")
    } catch (error) {
        console.error("Error connecting to the database:", error);
        process.exit(1);
    }
}

export default connectDB;
