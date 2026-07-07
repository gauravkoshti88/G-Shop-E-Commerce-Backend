import express from "express";
import { getUser } from "../../controllers/user/user.controller.js";
import { userAuth } from "../../middleware/Auth.js";

const userRouter = express.Router();

userRouter.get("/get-user", userAuth, getUser);

export default userRouter