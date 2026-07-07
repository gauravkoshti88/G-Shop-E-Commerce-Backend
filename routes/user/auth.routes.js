import express from "express";
import { userLogin, userLogout, userRegister } from "../../controllers/user/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/user-register", userRegister);
authRouter.post("/user-login", userLogin);
authRouter.post("/user-logout", userLogout);

export default authRouter;