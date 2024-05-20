import mongoose from "mongoose";
const Schema = mongoose.Schema;

const EductionalVideosSchema = new Schema(
  {
    title: { type: String, required: false },
    videoTime: { type: Number, require: false },
    isActive: { type: Boolean, require: false, default: true },
    isAvailable: { type: Boolean, require: false, default: true },
    isPayActive: { type: Boolean, require: true, default: false },
    headLine: { type: Schema.Types.ObjectId, ref: "HeadLines", require: true },
  },
  { timestamps: true }
);

export default mongoose.model("EductionalVideos", EductionalVideosSchema);
