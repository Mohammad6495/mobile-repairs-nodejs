import mongoose from "mongoose";
const Schema = mongoose.Schema;

const RoleSchema = new Schema(
  {
    name: { type: String, required: false },
    label: { type: String, required: false },
  },
  { timestamps: true }
);

export default mongoose.model("Role", RoleSchema);
