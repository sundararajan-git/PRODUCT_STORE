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
} from "../CONTROLLERS/User.Controller.js";
import { verifyToken } from "../MIDDLEWARE/validUser.js";

// CHECK IS VALID USER OR NOT
router.get("/isvaliduser", verifyToken, isValidUser);

// USER RIGISTER
router.post("/signup", signUp);

// USER VERIFICATION
router.post("/verify", verifyEmail);

//  USER LOGIN
router.post("/login", login);

// USER LOGOUT
router.post("/logout", logout);

// USER PROFILE UPDATE
router.put("/updateprofile", updateProfile);

// USER PASSWORD UPDATE
router.put("/resetpassword/:token", resetPassword);

// USER FORGOT PASSWORD
router.post("/forgotpassword", forgotPassword);

export default router;
