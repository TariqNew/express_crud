import jwt from "jsonwebtoken";

const validateToken = (req, res, next) => {
    const authHeader = req.headers.Authorization || req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer ")) {
        const token = authHeader.split(" ")[1];

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: "Unauthorized: Invalid token" });
            }
            req.user = decoded.user;
            next();
        });
    } else {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }
};

export default validateToken;
