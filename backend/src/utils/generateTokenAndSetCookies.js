import jwt from "jsonwebtoken";

// generate the token and set in cookies
export const generateTokenAndSetCookie = async (res, userId) => {
  try {

    // gen token
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // set res of cookies
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

  } catch (err) {
    res.status(400).send(err.message);
  }
};
