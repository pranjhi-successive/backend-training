import mongoose, { Schema } from 'mongoose';
import IMobile from '../entities/MobileInterface';

const mobileSchema = new Schema<IMobile>(
    {
        brand: { type: String, required: true },
        modelNumber: { type: String, required: true },
        price: { type: Number, required: true },
        color: { type: String, required: true },

        specifications: {
            display: { type: String, required: true },
            camera: { type: String, required: true },
            processor: { type: String, required: true },
            storage: { type: String, required: true },
        },
        releaseDate: { type: Date, required: true },
        batteryCapacity: { type: String, required: true },
        connectivity: {
            wifi: { type: Boolean },
            bluetooth: { type: Boolean },
            cellular: { type: Boolean },
        },
        weight: { type: Number },
        operatingSystem: { type: String, required: true },
        isWaterResistant: { type: Boolean, default: false },
        additionalFeatures: { type: [String] },
        accessories: [
            {
                name: { type: String },
                type: { type: String },
                price: { type: Number },
            },
        ],
        warranty: {
            validUntil: { type: Date },
            type: { type: String },
        },
        image: { type: String, required: true },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
        },
        updatedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
        },
    },
    { timestamps: true },
);

mobileSchema.index({ modelNumber: 1, color: 1 }, { unique: true });
mobileSchema.index({ brand: 1 });

export default mobileSchema;
