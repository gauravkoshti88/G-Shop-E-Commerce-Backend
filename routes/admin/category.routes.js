import express from "express";
import { adminAuth } from "../../middleware/Auth.js";
import { addCategory } from "../../controllers/admin/category.controller.js";
import upload from "../../middleware/multer.js";

const categoryRouter = express.Router();

categoryRouter.post("/add-category", adminAuth, upload.single("image"), addCategory);

export default categoryRouter;