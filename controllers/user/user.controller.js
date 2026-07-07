import User from "../../models/user/userSchema.js"

export const getUser = async (req, res) => {
    try {
        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: No user ID"
            });
        }

        const user = await User.findById(req.userId).select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        if (user.isBlocked) {
            return res.status(403).json({
                success: false,
                message: "User account is blocked"
            });
        }

        return res.status(200).json({
            success: false,
            user
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: `Get User Error ${error}`
        })
    }
}