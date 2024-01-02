import { Schema } from 'mongoose';
import { ICountry } from '../model/mobile';

const countrySchema = new Schema<ICountry>({
    countryName: { type: String, required: true },
    playersName: [{ type: String, required: true }],
});
export default countrySchema;
