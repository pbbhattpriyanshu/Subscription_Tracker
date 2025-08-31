import { Router } from 'express';
import { createSubscription, getUserSubscription } from '../Controllers/subscription.controller.js';
import authorize from '../Middleware/auth.middleware.js';
const subscriptionRouter = Router();


subscriptionRouter.get('/', (req, res) => { res.send("GET all Subscriptions")})

subscriptionRouter.get('/:id', (req, res) => { res.send("GET Subscriptions details")})

subscriptionRouter.post('/', authorize, createSubscription)

subscriptionRouter.put('/:id', (req, res) => { res.send("UPDATE Subscriptions")})

subscriptionRouter.delete('/:id', (req, res) => { res.send("DELETE Subscriptions")})

subscriptionRouter.get('/user/:id', authorize, getUserSubscription)

subscriptionRouter.put('/:id/cancel', (req, res) => { res.send("CANCEL Subscriptions")})

subscriptionRouter.get('/upcoming-renewals', (req, res) => { res.send("GET upcoming renewals")})


export default subscriptionRouter;