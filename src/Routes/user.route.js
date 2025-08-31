import { Router } from 'express';
import { getUser, getUsers } from '../Controllers/user.controller.js';
import authorize from '../Middleware/auth.middleware.js';
const userRouter = Router();


userRouter.get('/', getUsers)

//Read //personal - authMiddleware(authorised person)   -- R
userRouter.get('/:id', authorize, getUser)

//Create  -- C
userRouter.post('/create', (req, res) => {res.send("User is created")})

//Update  -- U
userRouter.put('/update/:id', (req, res) => { res.send(" UPDATE user ")})

//Delete  -- D
userRouter.get('/delete/:id', (req, res) => { res.send(" DELETE user ")})



export default userRouter;