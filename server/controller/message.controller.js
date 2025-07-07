import cloudinary from "../lib/Cloudinary.js";
import { getReceiverSocketId, io } from "../lib/Socket.js";
import MessageModel from "../models/message.model.js";
import UserModel from "../models/user.model.js";

export const getUserForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    const filteredUser = await UserModel.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    return res.status(200).json(filteredUser);
  } catch (error) {
    return res.status(400).json({ "error Message": error.message });
  }
};

export const getMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const myId = req.user._id;

    const message = await MessageModel.find({
      $or: [
        { senerdId: myId, receiverId: id },
        { senerdId: id, receiverId: myId },
      ],
    });

    return res.status(200).json({ message });
  } catch (error) {
    return res.status(400).json("error", error.message);
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id } = req.params;
    const senderId = req.user._id;

    let imageurl;

    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageurl = uploadResponse.secure_url;
    }

    const newMessaage = new MessageModel({
      senerdId: senderId,
      receiverId: id,
      text,
      image: imageurl,
    });

    await newMessaage.save();

    const reciverSocketId = getReceiverSocketId(id);

    if (reciverSocketId) {
      io.to(reciverSocketId).emit("NewMessage", newMessaage);
    }

    res.status(200).json(newMessaage);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
