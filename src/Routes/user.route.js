import { Router } from 'express';
import { getUser, getUsers } from '../Controllers/user.controller';
const userRouter = Router();


userRouter.get('/', getUsers)

//Create  -- C
userRouter.post('/create', getUser)

//Read    -- R
userRouter.get('/:id', (req, res) => { res.send(" GET user details ")})

//Update  -- U
userRouter.put('/update/:id', (req, res) => { res.send(" UPDATE user ")})

//Delete  -- D
userRouter.get('/delete/:id', (req, res) => { res.send(" DELETE user ")})



export default userRouter;