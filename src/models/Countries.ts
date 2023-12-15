import mongoose, { Schema } from 'mongoose';
import { type ICountry } from '../entities/CountryInterface';

const countrySchema = new Schema<ICountry>({
    countryName: { type: String, required: true },
    playersName: [{ type: String, required: true }],
});

export const CountryModel = mongoose.model<ICountry>('Country', countrySchema);
export type { ICountry };
