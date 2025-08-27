import { Router } from 'express';
const userRouter = Router();


userRouter.get('/', (req, res) => { res.send(" GET all users ")})

//Create  -- C
userRouter.post('/create', (req, res) => { res.send(" CREATE New user ")})

//Read    -- R
userRouter.get('/:id', (req, res) => { res.send(" GET user details ")})

//Update  -- U
userRouter.put('/update/:id', (req, res) => { res.send(" UPDATE user ")})

//Delete  -- D
userRouter.get('/delete/:id', (req, res) => { res.send(" DELETE user ")})



export default userRouter;