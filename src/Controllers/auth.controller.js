import User from "../Models/user.model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const SignUp = async (req, res, next) => {
    try {
        //taking the data from user
        const { name, email, password } = req.body;

        //check if user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            const error = new Error('User already exists');
            error.statusCode = 409;
            throw error;
        }

        //Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user directly (no transaction needed)
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword
        });

        // Generate JWT token
        const token = jwt.sign(
            { userId: newUser._id },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: {
                token,
                user: newUser,
            }
        });
    } catch (error) {
        next(error);
    }
};

export const SignIn = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            const error = new Error('Invalid email or password');
            error.statusCode = 401;
            throw error;
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            const error = new Error('Invalid email or password');
            error.statusCode = 401;
            throw error;
        }

        // Generate token
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        res.status(200).json({
            success: true,
            message: 'Login successful',
            data: {
                token,
                user,
            }
        });
    } catch (error) {
        next(error);
    }
};

export const SignOut = async (req, res, next) => {
    try {
        // For JWT, logout is usually handled on client by deleting token
        res.status(200).json({
            success: true,
            message: 'Logged out successfully'
        });
    } catch (error) {
        next(error);
    }
};
