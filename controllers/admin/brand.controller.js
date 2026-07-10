import mongoose from "mongoose";
import ProductBrand from "../../models/admin/brandSchema.js";
import Category from "../../models/admin/categorySchema.js";
import SubCategory from "../../models/admin/subCategorySchema.js";
import { deleteFromCloudinary, updateCloudinaryImage, uploadToCloudinary } from "../../utils/cloudinaryFunc.js";

export const addNewBrand = async (req, res) => {
    try {
        const { category, subCategory, name, description } = req.body;

        if (!category || !subCategory || !name || !description) {
            return res.status(400).json({
                success: false,
                message: 'Required all fields'
            })
        }

        const categoryExist = await Category.findById(category);

        if (!categoryExist) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            })
        }

        const subCategoryExist = await SubCategory.findById(subCategory);

        if (!subCategoryExist) {
            return res.status(404).json({
                success: false,
                message: "Sub-Category not found"
            })
        }

        const productBrand = await ProductBrand.findOne({
            category,
            subCategory,
            name: name.trim()
        });

        if (productBrand) {
            return res.status(400).json({
                success: false,
                message: `${productBrand.name} Product Brand is already exists`
            })
        }

        let image = {
            url: "",
            public_id: ""
        }

        if (req.file) {
            const result = await uploadToCloudinary(req.file.buffer, "productbrands");

            image = {
                url: result.secure_url,
                public_id: result.public_id
            }
        }

        const newBrand = await ProductBrand.create({
            category,
            subCategory,
            name: name.trim(),
            description,
            image
        })

        return res.status(201).json({
            success: true,
            message: 'New product brand created successfully ✅',
            newBrand
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: `Add brand error ${error}`
        })
    }
}

export const getBrandByCategoryAndSubCategory = async (req, res) => {
    try {
        const { categoryId, subCategoryId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(categoryId) || !mongoose.Types.ObjectId.isValid(subCategoryId)) {
            return res.status(400).json({
                success: false,
                message: 'Invaild category and subcategory id'
            })
        };

        const category = await Category.findById(categoryId);

        if (!category) {
            return res.status(404).json({
                success: false,
                message: 'Category not found'
            })
        }

        const subCategory = await SubCategory.findById(subCategoryId);

        if (!subCategory) {
            return res.status(404).json({
                success: false,
                message: 'Sub-Category not found'
            })
        }

        const brands = await ProductBrand.find({ category: categoryId, subCategory: subCategoryId }).populate("category subCategory");

        if (!brands) {
            return res.status(404).json({
                success: false,
                message: 'Product Brand not found'
            })
        }

        return res.status(200).json({
            success: true,
            message: `Get brands by category ${category.name} & subCategory ${subCategory.name}`,
            count: brands.length,
            brands
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: `Add brand error ${error}`
        })
    }
}

export const getBrandById = async (req, res) => {
    try {
        const { brandId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(brandId)) {
            return res.status(400).json({
                success: false,
                message: 'Invaild brand Id'
            })
        };

        const productBrand = await ProductBrand.findById(brandId).populate("category subCategory");

        if (!productBrand) {
            return res.status(404).json({
                success: false,
                message: 'Product Brand is not found'
            })
        }

        return res.status(200).json({
            success: true,
            message: `Get ${productBrand.name} Product Brand`,
            productBrand
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: `Get brand by Id error ${error}`
        })
    }
}

export const updateBrandById = async (req, res) => {
    try {
        const { brandId } = req.params;
        const { name, description } = req.body;

        if (!mongoose.Types.ObjectId.isValid(brandId)) {
            return res.status(400).json({
                success: false,
                message: 'Invaild brand Id'
            })
        };

        const productBrand = await ProductBrand.findById(brandId).populate("category subCategory");

        if (!productBrand) {
            return res.status(404).json({
                success: false,
                message: 'Brand is not found'
            })
        }

        if (name && name.trim() !== productBrand.name) {
            const exists = await ProductBrand.findOne({
                name: name.trim(),
                _id: { $ne: brandId },
            })

            if (exists) {
                return res.status(400).json({
                    success: false,
                    message: "Product brand already exists",
                })
            }
        }

        if (req.file) {
            const result = await updateCloudinaryImage(req.file.buffer, productBrand.image.public_id, 'productbrands');

            productBrand.image = {
                url: result.secure_url,
                public_id: result.public_id
            }
        }

        if (name) productBrand.name = name.trim();
        if (description) productBrand.description = description;

        await productBrand.save();

        return res.status(200).json({
            success: true,
            message: `Product Brand ${productBrand.name} Updated Successfully`,
            productBrand
        })


    } catch (error) {
        return res.status(500).json({
            success: false,
            error: `Update brand by Id error ${error}`
        })
    }
}

export const updateBrandStatusById = async (req, res) => {
    try {
        const { brandId } = req.params;

        const { status } = req.body;

        if (!mongoose.Types.ObjectId.isValid(brandId)) {
            return res.status(400).json({
                success: false,
                message: 'Invaild brand Id'
            })
        };

        const brand = await ProductBrand.findById(brandId).populate("category subCategory");

        if (!brand) {
            return res.status(404).json({
                success: false,
                message: 'Brand is not found'
            })
        }

        if (brand.status === status) {
            return res.status(400).json({
                success: false,
                message: `Brand already ${status}`
            })
        }

        brand.status = status;
        await brand.save();

        return res.status(200).json({
            success: true,
            message: 'Status Updated Successfully ✅',
            brand
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: `Update brand status by Id error ${error}`
        })
    }
}

export const deleteBrandById = async (req, res) => {
    try {
        const { brandId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(brandId)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid Brand Id'
            })
        }

        const brand = await ProductBrand.findById(brandId);

        if (!brand) {
            return res.status(404).json({
                success: false,
                message: 'Brand not found'
            })
        }

        await deleteFromCloudinary(brand.image.public_id);

        await ProductBrand.findByIdAndDelete(brandId);

        return res.status(200).json({
            success: true,
            message: 'Product Brand Deleted Successfully ✅'
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: `Delete brand by Id error ${error}`
        })
    }
}