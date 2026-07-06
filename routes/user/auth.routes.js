import express from "express";
import { userLogin, userRegister } from "../../controllers/user/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/user-register", userRegister);

authRouter.post("/user-login", userLogin);

export default authRouter;