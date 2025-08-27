import { Router } from "express";
import { SignUp, SignIn, SignOut } from "../Controllers/auth.controller.js";
const authRouter = Router();

authRouter.post('/sign-up', SignUp);
authRouter.post('/sign-in', SignIn);
authRouter.get('/sign-out', SignOut);



export default authRouter;