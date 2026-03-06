import jwt from "jsonwebtoken";

export const authAdmin = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ success: false, message: "No token provided" });
    }

    const token = authHeader.split(" ")[1]; // remove Bearer
    console.log("TOKEN:", token);

    if (!token) {
      return res.status(401).json({ success: false, message: "Token missing" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.email === process.env.ADMIN_EMAIL) {
      next();
    } else {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

  } catch (error) {
    console.log("error from authAdmin middleware =", error);
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};
