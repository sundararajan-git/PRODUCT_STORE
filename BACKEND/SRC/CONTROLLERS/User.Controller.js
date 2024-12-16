import User from "../MODELS/User.Model.js";
import bcryptjs from "bcryptjs";

// USER SIGNUP
export const signUp = async (req, res) => {
  try {
    console.log(req.body);

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    let user = await User.findOne({ email });

    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    res.status(200).json({
      success: true,
      message: "User created successfully",
      data: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ successs: false, message: "Server Error" });
  }
};

// USER LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // Check if user exists
    let user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User does not exist" });
    }

    const isvalidPassword = await bcryptjs.compare(password, user?.password);

    if (!isvalidPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid password" });
    }

    user.lastLogin = new Date();
    await user.save();

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({ success: false, message: err.message });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const { code } = req.body;

    if (!code) {
      res.status(400).json({ success: false, message: "Code is required" });
    }

    const user = await User.findOne({ verificationToken: code });

    if (!user) {
      res.status(400).json({ success: false, message: "Invalid code" });
    }

    user.isVerifed = true;
    user.verificationToken = undefined;
    user.verifactionExpireAt = undefined;
    await user.save();

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

// USER LOGOUT
export const logout = async (req, res) => {
  try {
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

// USER FORGOT PASSWORD
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      res.status(400).json({ success: false, message: "User does not exist" });
    }

    user.resetToken = 12312;
    user.resetTokenExpireAt = Date.now();

    await user.save();

    res.status(200).json({
      success: true,
      message: "Email send successfully",
      data: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

// USER RESET PASSWORD
export const resetPassword = async (req, res) => {
  try {
    const { password } = req.body;

    const token = req.params.token;

    if (!token) {
      res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    if (!password) {
      res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const user = await User.findOne({ resetToken: token });

    if (!user) {
      res.status(400).json({ success: false, message: "Invalid token" });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpireAt = undefined;
    await user.save();

    res
      .status(200)
      .json({ success: true, message: "Password reset successfully" });
  } catch (err) {
    console.error(err);
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

// USER UPDATE PROFILE
export const updateProfile = async (req, res) => {
  try {
    const { name, password, profilePic, id } = req.body;

    if (name || password || profilePic) {
      res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const user = await User.findById(id);

    if (!user) {
      res.status(400).json({ success: false, message: "User not Found !" });
    }
    const hashedPassword = await bcryptjs.hash(password, 10);

    user.name = name;
    user.password = hashedPassword;
    user.profilePicture = profilePic;
    await user.save();

    res
      .status(200)
      .json({ success: true, message: "Profile updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};
