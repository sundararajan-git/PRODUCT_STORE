import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  try {

    // get token in cookies
    const token = req.cookies.token;

    // validate the token
    if (!token) {
      res.status(400).json({ success: false, message: "No token provied" });
    }

    // verifiy the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // vlaidate the decoded
    if (!decoded) {
      res
        .status(400)
        .json({ success: false, message: "Invalid token provied" });
    }

    req.userId = decoded.userId;
    // call the next call back func for res the user data
    next();

  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
