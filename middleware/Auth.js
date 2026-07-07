import jwt from 'jsonwebtoken'

export const userAuth = (req, res, next)=>{
    try {
        const token = req.cookies?.userToken;

        if(!token){
            return res.status(401).json({
                message:"User does not have a token"
            })
        }

        const verifyToken = jwt.verify(token, process.env.JWT_SECRET);

        if(!verifyToken){
            return res.status(401).json({
                message: "User does not have a valid token"
            })
        }

        req.userId = verifyToken.userId;

        next()
    } catch (error) {
        return res.status(500).json({
            error: `User Authentication Error ${error}`
        })
    }
}

export const adminAuth = (req, res, next)=>{
    try {
        const token = req.cookies?.adminToken;

        if(!token){
            return res.status(401).json({
                message:"Admin does not have a token"
            })
        }

        const verifyToken = jwt.verify(token, process.env.JWT_SECRET);

        if(!verifyToken){
            return res.status(401).json({
                message: "Admin does not have a valid token"
            })
        }

        req.adminId = verifyToken.adminId;

        next()
    } catch (error) {
        return res.status(500).json({
            error: `Admin Authentication Error ${error}`
        })
    }
}