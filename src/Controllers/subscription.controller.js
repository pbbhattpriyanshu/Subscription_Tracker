import Subscription from "../Models/subscription.model.js";

export const createSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.create({...req.body, user: req.user.id});

        res.status(201).json({ message: 'Subscription created successfully', subscription });
    } catch (error) {
        console.log(`Error Comes is Subscription Controller ${error}`);
        next(error);
    }
};

export const getUserSubscription = async (req, res, next) => {
    try {
        if(req.user.id !== req.params.id) {
            return res.status(403).json({ message: 'Forbidden: You can only access your own subscriptions' });
        }
        const subscriptions = await Subscription.find({ user: req.user.id });
        res.status(200).json({ message: 'User subscriptions fetched successfully', subscriptions });
    } catch (error) {
        console.log(`Error Comes is Subscription Controller ${error}`);
        next(error);
    }
};