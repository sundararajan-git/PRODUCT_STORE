import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  try {

    console.log(req)

    const token = req.cookies.token;

    if (!token) {
      res.status(400).json({ success: false, message: "No token provied" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      res
        .status(400)
        .json({ success: false, message: "Invalid token provied" });
    }

    req.userId = decoded.userId;

    next();
  } catch (err) {
    console.error(err);
    res.status(400).json({ success: false, message: err.message });
  }
};
