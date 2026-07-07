import express from "express";
import { adminAuth } from "../../middleware/Auth.js";
import { addCategory, categoryList, getSingleCategory, updateCategory } from "../../controllers/admin/category.controller.js";
import upload from "../../middleware/multer.js";

const categoryRouter = express.Router();

categoryRouter.post("/add-category", adminAuth, upload.single("image"), addCategory);
categoryRouter.get("/category-list", adminAuth, categoryList);
categoryRouter.get("/category/:id", adminAuth, getSingleCategory);
categoryRouter.put("/update-category/:id", adminAuth, upload.single("image"), updateCategory);

export default categoryRouter;