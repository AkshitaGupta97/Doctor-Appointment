import jwt from "jsonwebtoken";

export const authDoctor = async (req, res, next) => {
    try {

        const authHeader = req.headers.authorization;

        // check header exists
        if (!authHeader) {
            return res.json({
                success: false,
                message: "Authorization header missing"
            });
        }

        // check Bearer token format
        const tokenParts = authHeader.split(" ");

        if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
            return res.json({
                success: false,
                message: "Invalid token format"
            });
        }

        const dtoken = tokenParts[1];

        // verify token
        const decoded = jwt.verify(dtoken, process.env.JWT_SECRET);

        if (!decoded?.id) {
            return res.json({
                success: false,
                message: "Invalid token payload"
            });
        }

        // attach userId
        req.docId = decoded.id;

        next();

    } catch (error) {
        console.log("Auth Middleware Error:", error.message);

        return res.json({
            success: false,
            message: "Unauthorized"
        });
    }
};
