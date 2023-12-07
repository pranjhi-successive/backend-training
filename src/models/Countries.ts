import mongoose, { Schema } from "mongoose";

export interface ICountry {
  CountryName: string;
  PlayersName: string[];
}

const CountrySchema = new Schema<ICountry>({
  CountryName: { type: String, required: true },
  PlayersName: [{ type: String, required: true }],
});

export const CountryModel = mongoose.model<ICountry>("Country", CountrySchema);
