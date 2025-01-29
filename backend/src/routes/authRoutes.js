import express from "express";
const router = express.Router();
import {
  signUp,
  login,
  logout,
  forgotPassword,
  resetPassword,
  updateProfile,
  verifyEmail,
  isValidUser,
} from "../controllers/userController.js";
import { verifyToken } from "../middlewares/validUser.js";

// check is valid user or not
router.get("/isvaliduser", verifyToken, isValidUser);

// user rigister
router.post("/signup", signUp);

// user verification
router.post("/verify", verifyEmail);

//  user login
router.post("/login", login);

// user logout
router.post("/logout", logout);

// user profile update
router.put("/updateprofile", updateProfile);

// user password update
router.put("/resetpassword/:token", resetPassword);

// user forgot password
router.post("/forgotpassword", forgotPassword);

export default router;
