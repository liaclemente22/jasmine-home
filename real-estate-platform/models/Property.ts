import { Schema, model, models } from "mongoose";

const PropertySchema = new Schema(
    {
        id: { type: String, required: true, unique: true, index: true },
        title: { type: String, required: true },
        price: { type: Number, required: true },
        bedrooms: { type: Number, required: true },
        bathrooms: { type: Number, required: true },
        area: { type: Number, required: true },
        location: { type: String, required: true, index: true },
        type: { type: String, enum: ["rent", "sale"], required: true, index: true },
        status: {
            type: String,
            enum: ["available", "sold", "reserved"],
            required: true,
            index: true,
        },
        featured: { type: Boolean, default: false, index: true },
        description: { type: String, required: true },
        images: { type: [String], default: [] },
    },
    { timestamps: true }
);

export const PropertyModel = models.Property || model("Property", PropertySchema);
