import Admin from "../../models/admin/adminModel.js";

export const getAdmin = async (req, res) => {
    try {
        if (!req.adminId) {
            return res.status(401).json({ message: "Unauthorized: No admin ID" });
        }

        const admin = await Admin.findById(req.adminId).select("-password");

        if (!admin) {
            return res.status(404).json({
                message: "Admin not found"
            })
        }

        return res.status(200).json(admin)
    } catch (error) {
        return res.status(500).json({
            error: `Get Admin Error ${error}`
        })
    }
}