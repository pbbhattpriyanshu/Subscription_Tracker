import jwt from "jsonwebtoken";
import User from "../Models/user.model.js";

const authorize = async (req, res, next) => {
  try {
    let token;

    // ✅ Check if Authorization header exists and starts with "Bearer"
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    // ❌ No token found
    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    // ✅ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Find user
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }

    // ✅ Attach user to request
    req.user = user;
    next();
  } catch (error) {
    console.error("Authorization error:", error.message);
    res.status(401).json({ message: "Unauthorized", error: error.message });
  }
};

export default authorize;
