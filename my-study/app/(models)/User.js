import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: String,
    email: String,
    password: String,
    profile: String,
    userName: String,
    region: String,
    roomName: String,
    stamps: [{ stampId: String, number: Number }],
    paperStyles: [String],
    contacts: [String],
    badges: [String],
    languages: [String],
    onboarded: Boolean,
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
