import mongoose, { Schema } from "mongoose";

const stampSchema = new Schema(
  {
    stampId: String,
    name: String,
    description: String,
    image: String,
    price: Number,
  },
  { timestamps: true }
);

const Stamp = mongoose.models.Stamp || mongoose.model("Stamp", stampSchema);

export default Stamp;
