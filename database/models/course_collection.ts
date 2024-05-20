import mongoose from "mongoose";
const Schema = mongoose.Schema;

const CourseSchema = new Schema(
    {
        title: { type: String, required: true },
        image: { type: String, required: false },
        description: { type: String, required: false },
        viewCount: { type: Number, required: false, default: 1 },
        price: { type: Number, required: true },
        courseLevel: {
            type: Number,
            enum: [0, 1, 2],
            required: true,
            default: 0
        },
        courseStatus: {
            type: Number,
            enum: [0, 1, 2],
            required: true,
            default: 1
        },
        count: { type: Number, required: false, default: 1},
        teacher: { type: String, required: true },
        isActive: { type: Boolean, require: false, default: true },
        isAvailable: { type: Boolean, require: false, default: true },
        isFree: { type: Boolean, default: false },
        category: { type: Schema.Types.ObjectId, ref: "Category", require: true },
        headLines: [{ type: Schema.Types.ObjectId, ref: "HeadLines", require: false }],
    },
    { timestamps: true }
);

export default mongoose.model("Course", CourseSchema);
