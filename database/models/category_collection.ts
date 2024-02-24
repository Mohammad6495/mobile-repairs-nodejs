import mongoose from "mongoose";
const Schema = mongoose.Schema;

const CategorySchema = new Schema(
  {
    title: { type: String, required: true },
    image: { type: String, required: false },
    isActive: { type: Boolean, require: false, default: true },
    isAvailable: { type: Boolean, require: false, default: true }
  },
  { timestamps: true }
);

export default mongoose.model("Category", CategorySchema);
