import mongoose from "mongoose";

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    totalPrice: { type: Number, required: true },
    isActive: { type: Boolean, require: false, default: true },
    isPay: { type: Boolean, require: false, default: false },
    isAvailable: { type: Boolean, require: false, default: true },
    user: { type: Schema.Types.ObjectId, ref: "User", require: true },
    resnumber : { type : String , required : true},
    licenceKey: { type: String, require: false },
    course: [{ type: Schema.Types.ObjectId, ref: "Course", require: false, default: [] }],
}, {
    timestamps: true
});
export default mongoose.model("Order", OrderSchema);