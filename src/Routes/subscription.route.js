import { Router } from 'express';
const subscriptionRouter = Router();


subscriptionRouter.get('/', (req, res) => { res.send("GET all Subscriptions")})

subscriptionRouter.get('/:id', (req, res) => { res.send("GET Subscriptions details")})

subscriptionRouter.post('/', (req, res) => { res.send("CREATE Subscriptions")})

subscriptionRouter.put('/:id', (req, res) => { res.send("UPDATE Subscriptions")})

subscriptionRouter.delete('/:id', (req, res) => { res.send("DELETE Subscriptions")})

subscriptionRouter.get('/user/:id', (req, res) => { res.send("GET all user Subscriptions")})

subscriptionRouter.put('/:id/cancel', (req, res) => { res.send("CANCEL Subscriptions")})

subscriptionRouter.get('/upcoming-renewals', (req, res) => { res.send("GET upcoming renewals")})


export default subscriptionRouter