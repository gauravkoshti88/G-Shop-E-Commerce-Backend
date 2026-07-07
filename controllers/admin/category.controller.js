import Category from "../../models/admin/categorySchema.js";
import { uploadToCloudinary } from "../../utils/cloudinaryFunc.js";

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
                message: "Category already exists"
            })
        }

        let image = {
            url: "",
            public_id:""
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
            success:true,
            message:"Category Added Successfully ✅",
            category
        })

    } catch (error) { 
        return res.status(500).json({
            success:false,
            error: `Add Category Error ${error}`
        })
    }
}