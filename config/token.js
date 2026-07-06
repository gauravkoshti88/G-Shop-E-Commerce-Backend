import jwt from 'jsonwebtoken';

export const genrateToken = (userId) => {
    try {
        const token = jwt.sign(
            { userId },
            process.env.JWT_SECRATE,
            { expiresIn: "7d" }
        );
        return token;
    } catch (error) {
        console.log(`Genrate Token Error ${error}`);
    }
}