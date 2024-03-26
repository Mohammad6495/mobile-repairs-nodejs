import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: { type: String, require: true },
    lastName: { type: String, require: true },
    token: { type: String, require: false },
    nikname: { type: String, require: true },
    userName: { type: String, require: true },
    expireCode: { type: Date, require: false },
    password: { type: String, require: true },
    role: [{ type: Schema.Types.ObjectId, ref: "Role" }],
    course: [{ type: Schema.Types.ObjectId, ref: "Course", require: false, default: [] }],
    orders: [{ type: Schema.Types.ObjectId, ref: "Order", require: false, default: [] }],
}, {
    timestamps: true
});
export default mongoose.model("User", userSchema);