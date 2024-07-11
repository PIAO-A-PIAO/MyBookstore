import mongoose, { Schema } from "mongoose";

const treeholeSchema = new Schema({
  userId: String,
  stamps: [String],
  languages: [String],
  location: String,
  onboard: Boolean,
});

const Treehole =
  mongoose.models.Treehole || mongoose.model("Treehole", treeholeSchema);
export default Treehole;
