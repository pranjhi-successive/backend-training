import mongoose from 'mongoose';
import { ICountry } from '../../entities/CountryInterface';
import countrySchema from '../schema/country';

export const CountryModel = mongoose.model<ICountry>('Country', countrySchema);
export type { ICountry };
