import mongoose, { Schema } from "mongoose";

const draftSchema = new Schema(
  {
    senderId: String,
    recipientId: String,
    contents: [String],
    attachments: [String],
    title: String,
    stampUsed: String,
    paperStyle: String,
    language: String,
  },
  { timestamps: true }
);

const Draft = mongoose.models.Draft || mongoose.model("Draft", draftSchema);

export default Draft;
