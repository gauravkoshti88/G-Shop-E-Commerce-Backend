import mongoose from "mongoose";
import Category from "../../models/admin/categorySchema.js";
import { updateCloudinaryImage, uploadToCloudinary } from "../../utils/cloudinaryFunc.js";

export const addCategory = async (req, res) => {
    try {
        const { name, description } = req.body;

        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Category name is required"
            })
        }

        const categoryExists = await Category.findOne({ name: name.trim() });

        if (categoryExists) {
            return res.status(400).json({
                success: false,
                message: `${categoryExists.name} Category already exists`
            })
        }

        let image = {
            url: "",
            public_id: ""
        }

        if (req.file) {
            const result = await uploadToCloudinary(req.file.buffer, "categories");
            image = {
                url: result.secure_url,
                public_id: result.public_id
            }
        }

        const category = await Category.create({
            name: name.trim(),
            description,
            image
        });

        return res.status(201).json({
            success: true,
            message: "Category Added Successfully ✅",
            category
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: `Add Category Error ${error}`
        })
    }
}

export const categoryList = async (req, res) => {
    try {
        const categories = await Category.find().sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            message: "Get Categories List Successfully",
            count: categories.length,
            categories
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: `Category List Error ${error}`
        })
    }
}

export const getSingleCategory = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid Category Id'
            });
        }

        const category = await Category.findById(id);

        if (!category) {
            return res.status(404).json({
                success: false,
                message: `Category not found`
            });
        }

        return res.status(200).json({
            success: true,
            message: `Get ${category?.name} Category Successfully`,
            category
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: `Get Single Category Error ${error}`
        })
    }
}

export const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid Category Id'
            });
        }

        const category = await Category.findById(id);

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            })
        }

        if (name && name.trim() !== category.name) {
            const exists = await Category.findOne({
                name: name.trim(),
                _id: { $ne: id },
            })

            if (exists) {
                return res.status(400).json({
                    success: false,
                    message: "Category already exists",
                })
            }
        }

        if (req.file) {
            if (category.image.public_id) {
                const result = await updateCloudinaryImage(req.file.buffer, category.image.public_id, "categories");

                category.image = {
                    url: result.secure_url,
                    public_id: result.public_id
                }
            }
        }

        if (name) category.name = name.trim();
        if (description !== undefined) category.description = description;

        await category.save();

        return res.status(200).json({
            success: true,
            message: "Category Updated Successfully",
            category
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: `Update Category Error ${error}`
        })
    }
}