import mongoose, { Schema } from "mongoose";

const stampSchema = ({
  stampId: { type: String, required: true },
  number: { type: Number, required: true }
});

const userSchema = new Schema(
  {
    name: String,
    email: String,
    password: String,
    profile: String,
    userName: String,
    region: String,
    roomName: String,
    stamps: [stampSchema],
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