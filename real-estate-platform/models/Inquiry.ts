import { Schema, model, models } from "mongoose";

const InquirySchema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        property: { type: String },
        subject: { type: String, required: true },
        message: { type: String, required: true },
        type: {
            type: String,
            enum: ["property", "submission", "contact"],
            default: "contact",
            index: true,
        },
        status: {
            type: String,
            enum: ["new", "contacted", "closed"],
            default: "new",
            index: true,
        },
        lastResponseMessage: { type: String },
        lastRespondedAt: { type: Date },
    },
    { timestamps: true }
);

export const Inquiry = models.Inquiry || model("Inquiry", InquirySchema);
