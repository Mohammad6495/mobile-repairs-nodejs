import mongoose from "mongoose";
const Schema = mongoose.Schema;

const HeadLinesSchema = new Schema(
  {
    title: { type: String, required: false },
    description: { type: String, required: false },
    isActive: { type: Boolean, require: false, default: true },
    isAvailable: { type: Boolean, require: false, default: true },
    eductionals: [{ type: Schema.Types.ObjectId, ref: "EductionalVideos", require: false }],
    course: { type: Schema.Types.ObjectId, ref: "Course", require: true },
  },
  { timestamps: true }
);

export default mongoose.model("HeadLines", HeadLinesSchema);
