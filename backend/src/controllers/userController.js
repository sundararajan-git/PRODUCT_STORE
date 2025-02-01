import User from "../models/userModel.js"
import bcryptjs from "bcryptjs";
import crypto from "crypto";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookies.js";
import MailService from "../utils/sendMailHandler.js"

// user signup
export const signUp = async (req, res) => {
  try {

    // descruture the payload
    const { name, email, password } = req.body;

    // validate the values
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // find the user
    let user = await User.findOne({ email });

    //  return the user if already user sign up
    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    // hash the password
    const hashedPassword = await bcryptjs.hash(password, 10);

    // create the vaarification code
    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    user = new User({
      name,
      email,
      password: hashedPassword,
      verificationToken,
      verifactionExpireAt: Date.now() + 24 * 60 * 60 * 1000,
    });

    // update the user
    await user.save();

    // generate the jwt
    generateTokenAndSetCookie(res, user._id);

    // sub of the email
    const subject = "Verify Your Email"

    // send the email
    await MailService.sendVerificationMail(email, subject, verificationToken)

    res.status(200).json({
      success: true,
      message: "User created successfully",
      data: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (err) {
    res.status(400).json({ successs: false, message: "Server Error" });
  }
};

// user login
export const login = async (req, res) => {
  try {

    // destructure the payload
    const { email, password } = req.body;

    //  validate the values
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // check if user exists
    let user = await User.findOne({ email });

    //  user validation
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User does not exist" });
    }

    //  compare the user & hashed password
    const isvalidPassword = await bcryptjs.compare(password, user?.password);

    //  validate the correct password
    if (!isvalidPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid password" });
    }

    // update latest login date 
    user.lastLogin = new Date();

    // save the user
    await user.save();

    // generate the jwt
    generateTokenAndSetCookie(res, user._id);

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      data: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const verifyEmail = async (req, res) => {
  try {

    //  destructure the payload
    const { code } = req.body;

    //  validate the code 
    if (!code) {
      return res.status(400).json({ success: false, message: "Code is required" });
    }

    // find the valid user 
    const user = await User.findOne({
      verificationToken: code,
      verifactionExpireAt: { $gt: Date.now() },
    });

    //  validate the user
    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid code" });
    }

    //  update the vlaues
    user.isVerfied = true;
    user.verificationToken = undefined;
    user.verifactionExpireAt = undefined;

    // save the user
    await user.save();

    // sub of email
    const subject = "Welcome"

    // send the email
    await MailService.sendWelcomeCall(user.email, subject, user.name)

    res.status(200).json({
      success: true,
      message: "Email verified successfully",
      data: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({ success: false, message: err.message });
  }
};

// user logout
export const logout = async (req, res) => {
  try {
    // clear the cookies
    res.clearCookie("token");
    res.status(200).json({ success: true, message: "Logout successfully !" });
  } catch (err) {
    console.error(err);
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

// user forgot password
export const forgotPassword = async (req, res) => {
  try {

    // destruture the payload
    const { email } = req.body;

    // validate the email
    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    //  find the user
    const user = await User.findOne({ email });

    // validate the user
    if (!user) {
      return res.status(400).json({ success: false, message: "User does not exist" });
    }

    // update the values
    user.resetPasswordToken = crypto.randomBytes(20).toString("hex");
    user.resetPasswordTokenExpireAt = Date.now() + 1 * 60 * 60 * 10000;

    // save the email 
    await user.save();

    // sub of email
    const subject = "Forgot password";

    //  reset email link
    const link = `http://localhost:5173/resetpassword/${user.resetPasswordToken}`

    //  send the email
    await MailService.forgotPassword(user.email, subject, link)

    res.status(200).json({
      success: true,
      message: "Email send successfully",
      data: {
        ...user._doc,
        password: undefined,
      },
    });


  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

// user reset password
export const resetPassword = async (req, res) => {
  try {

    // desturtue the paylaod
    const { password } = req.body;
    // desture the params
    const { token } = req.params;

    //  validate the token and password
    if (!token || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // find the user
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordTokenExpireAt: { $gt: Date.now() },
    });

    // validate the user
    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid token" });
    }

    //  hash the new password
    const hashedPassword = await bcryptjs.hash(password, 10);

    //  update the values
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpireAt = undefined;

    // save the user
    await user.save();

    // sub of the email
    const subject = "Password reset sucessfull";

    //  send the  mail
    await MailService.passwordRestSuccess(user.email, subject)

    res
      .status(200)
      .json({ success: true, message: "Password reset successfully" });

  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

// user update profile
export const updateProfile = async (req, res) => {
  try {

    // desture the body
    const { name, password, profilePic, id } = req.body;

    // find the user
    const user = await User.findById(id);

    //  validate the user
    if (!user) {
      return res.status(400).json({ success: false, message: "User not Found !" });
    }

    //  hash the updated password
    const hashedPassword = await bcryptjs.hash(password, 10);

    // update the values
    user.name = name;
    user.password = hashedPassword;
    user.profilePicture = profilePic;

    // save the user
    await user.save();

    // generate the jwt
    generateTokenAndSetCookie(res, res._id);

    res
      .status(200)
      .json({ success: true, message: "Profile updated successfully" });

  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

export const isValidUser = async (req, res) => {
  try {

    //  find the user
    const user = await User.findById(req.userId).select("-password");

    // validate the user
    if (!user) {
      return res.status(400).json({
        success: false,
        messsage: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });

  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};
