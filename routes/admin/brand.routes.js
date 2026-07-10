import express from "express";
import { adminAuth } from "../../middleware/Auth.js";
import { addNewBrand, deleteBrandById, getBrandByCategoryAndSubCategory, getBrandById, updateBrandById, updateBrandStatusById } from "../../controllers/admin/brand.controller.js";
import upload from "../../middleware/multer.js";

const brandRouter = express.Router();

brandRouter.post("/category/sub-category/add-new-brand", adminAuth, upload.single("image") ,addNewBrand);
brandRouter.get("/category/:categoryId/sub-category/:subCategoryId/get-brand", adminAuth, getBrandByCategoryAndSubCategory);
brandRouter.get("/category/sub-category/brand/:brandId", adminAuth, getBrandById);
brandRouter.put("/category/sub-category/update-brand/:brandId", adminAuth, upload.single("image"), updateBrandById);
brandRouter.patch("/category/sub-category/update-brand-status/:brandId", adminAuth, updateBrandStatusById);
brandRouter.delete("/category/sub-category/delete-brand/:brandId", adminAuth, deleteBrandById);

export default brandRouter;