import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    senerdId: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
    receiverId: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
    text: { type: String },
    image: { type: String },
  },
  {
    timestamps: true,
  }
);

const MessageModel = mongoose.model("messages", MessageSchema);

export default MessageModel;
