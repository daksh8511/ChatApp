import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    fullName: { type: String, required: true },
    password: { type: String, required: true, minlenght: 6 },
    profilePic: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);


const UserModel = mongoose.model('Users', UserSchema)

export default UserModel;