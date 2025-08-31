import dotenv from 'dotenv';
dotenv.config();   // ✅ Fix dotenv

import express from 'express';
import connectDB from './src/Database/db.js';
import errorMiddleware from './src/Middleware/error.middleware.js';
import cookieParser from 'cookie-parser';

import authRouter from './src/Routes/auth.route.js';
import userRouter from './src/Routes/user.route.js';
import subscriptionRouter from './src/Routes/subscription.route.js';
import arcjetMiddleware from './src/Middleware/arcjet.middleware.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Connect DB
connectDB();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser()); 
app.use(arcjetMiddleware);

// Routes
app.use('/api/v1/auth', authRouter); 
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);

// Health check route
app.get('/', (req, res) => {
    res.send("Welcome to the Subscription Tracker API!");
});

// Error handler (always last)
app.use(errorMiddleware);

app.listen(PORT, () => {
    console.log(`🚀 Subscription tracker API running on http://localhost:${PORT}`);
});

export default app;
