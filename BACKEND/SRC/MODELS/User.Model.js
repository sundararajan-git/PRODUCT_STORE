import { Schema, model } from "mongoose";

// USER SCHEMA
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    },
    isVerfied: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
    },
    verifactionExpireAt: {
      type: Date,
    },
    resetToken: {
      type: String,
    },
    resetTokenExpireAt: {
      type: Date,
    },
    lastLogin: {
      type: Date,
      default: Date.now,
    },
    lastLogout: {
      type: Date,
      default: undefined,
    },
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

export default User;
