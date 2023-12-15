import { Schema } from 'mongoose';
import { type Mobile } from '../../../../entities/MobileInterface';

const mobileSchema = new Schema<Mobile>({
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
        wifi: { type: Boolean, required: true },
        bluetooth: { type: Boolean, required: true },
        cellular: { type: Boolean, required: true },
    },
    weight: { type: Number },
    operatingSystem: { type: String, required: true },
    isWaterResistant: { type: Boolean, default: false },
    additionalFeatures: { type: [String] },
    accessories: [
        {
            name: { type: String, required: true },
            type: { type: String },
            price: { type: Number },
        },
    ],
    warranty: {
        validUntil: { type: Date },
        type: { type: String },
    },
});
export default mobileSchema;
