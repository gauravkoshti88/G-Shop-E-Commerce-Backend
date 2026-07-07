import Admin from "../../models/admin/adminSchema.js";


export const getAdmin = async (req, res) => {
    try {
        if (!req.adminId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: No admin ID"
            });
        }

        const admin = await Admin.findById(req.adminId).select("-password");

        if (!admin) {
            return res.status(404).json({
                success: false,
                message: "Admin not found"
            })
        }

        return res.status(200).json({
            success: true,
            admin
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: `Get Admin Error ${error}`
        })
    }
}