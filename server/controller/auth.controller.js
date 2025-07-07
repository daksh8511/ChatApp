import cloudinary from "../lib/Cloudinary.js";
import { generateToken } from "../lib/Utils.js";
import UserModel from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const Signup = async (req, res) => {
  const { email, fullName, password, profilePic } = req.body;

  if (!email || !fullName || !password) {
    return res.status(400).json({ success: false, message: "Enter Details" });
  }

  try {
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password minimum required length 6.",
      });
    }

    const userExist = await UserModel.findOne({ email });

    if (userExist) {
      return res
        .status(400)
        .json({ success: false, message: "Uesr Already Exist" });
    }

    const saltPass = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, saltPass);

    const User = new UserModel({
      fullName: fullName,
      email: email,
      password: hashedPassword,
      profilePic: profilePic,
    });

    if (User) {
      generateToken(User._id, res);
      await User.save();

      return res.status(201).json({
        success: true,
        message: "Signup success",
        userData: {
          _id: User._id,
          fullName: User.fullName,
          email: User.email,
          profilePic: User.profilePic,
        },
      });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Invalid User Data" });
    }
  } catch (error) {
    return res.json({ success: false, message: error });
  }
};

export const Login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const User = await UserModel.findOne({ email });

    if (!User) {
      return res
        .status(404)
        .json({ success: false, message: "invalid credential!" });
    }

    const isPsswordCorrect = await bcryptjs.compare(password, User.password);

    if (!isPsswordCorrect) {
      return res
        .status(404)
        .json({ success: false, message: "invalid credential!" });
    }

    generateToken(User._id, res);

    return res.status(200).json({
      _id: User._id,
      profilePic: User.profilePic,
      email: User.email,
      fullName : User.fullName
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: "Login Failed" });
  }
};

export const Logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    return res.status(200).json({ success: true, message: "Logout success" });
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, message: "something wrong!" });
  }
};

export const UpdateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;

    const userId = req.user._id;

    if (!profilePic) {
      return res
        .status(400)
        .json({ success: false, message: "profile pic required" });
    }

    const uploadRes = await cloudinary.uploader.upload(profilePic);

    const User = await UserModel.findByIdAndUpdate(
      userId,
      { profilePic: uploadRes.secure_url },
      { new: true }
    );

    await User.save();

    return res.status(200).json(User);
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, message: "something wrong!" });
  }
};

export const CheckAuth = (req, res) => {
  try {
    return res.status(200).json(req.user);
  } catch (error) {
    return res.status(500).json({ message: "internal server error" });
  }
};
