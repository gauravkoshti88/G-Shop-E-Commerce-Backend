import User from "../../models/user/userSchema.js"

export const getUser = async (req, res) => {
    try {
        if (!req.userId) {
            return res.status(401).json({ message: "Unauthorized: No user ID" });
        }

        const user = await User.findById(req.userId).select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }

        if (user.isBlocked) {
            return res.status(403).json({ message: "User account is blocked" });
        }

        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json({
            error: `Get User Error ${error}`
        })
    }
}