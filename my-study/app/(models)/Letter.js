import mongoose, { Schema } from "mongoose";

const letterSchema = new Schema(
  {
    senderId: String,
    recipientId: String,
    contents: [String],
    attachments: [String],
    title: String,
    stampUsed: String,
    paperStyle: String,
    fromAddress: String,
    fromRegion: String,
    toAddress: String,
    toRegion: String,
    language: String,
    isDraft: Boolean,
    isSent: Boolean,
    isRead: Boolean
  },
  { timestamps: true }
);

const Letter = mongoose.models.Letter || mongoose.model("Letter", letterSchema);

export default Letter;