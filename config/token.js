import jwt from 'jsonwebtoken';

export const genrateToken = (userId) => {
    try {
        const token = jwt.sign(
            { userId },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );
        return token;
    } catch (error) {
        console.log(`Genrate Token Error ${error}`);
    }
}

export const adminToken = (adminId) => {
    try {
        const token = jwt.sign(
            { adminId },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );
        return token;
    } catch (error) {
        console.log(`Admin Token Error ${error}`);
    }
}