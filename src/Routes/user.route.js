import { Router } from 'express';
import { getUser, getUsers } from '../Controllers/user.controller.js';
const userRouter = Router();


userRouter.get('/', getUsers)

//Create  -- C
userRouter.post('/create', (req, res) => {res.send("User is created")})

//Read    -- R
userRouter.get('/:id', getUser)

//Update  -- U
userRouter.put('/update/:id', (req, res) => { res.send(" UPDATE user ")})

//Delete  -- D
userRouter.get('/delete/:id', (req, res) => { res.send(" DELETE user ")})



export default userRouter;