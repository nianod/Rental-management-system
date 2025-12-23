import { Schema, models, model } from "mongoose";

const updateSchema = new Schema(
    {
        update: { type: String, required: true },
        description: { type: String, required: true },
    },
    { timestamps: true }
);