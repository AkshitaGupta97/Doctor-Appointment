import jwt from "jsonwebtoken";

export const authUser = async (req, res, next) => {
  try {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.json({ success: false, message: "Unauthorized - No Token" });
    }

    // Format: Bearer token
    const userToken = authHeader.split(" ")[1];

    if (!userToken) {
      return res.json({ success: false, message: "Unauthorized - Invalid Token" });
    }

    const decoded = jwt.verify(userToken, process.env.JWT_SECRET);

    req.body.userId = decoded.id;

    next();

  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Unauthorized - Token Failed" });
  }
};
