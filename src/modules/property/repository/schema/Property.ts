import { Schema } from "mongoose";
import { type Property } from "../../../../entities/property/Property";

export const PropertySchema = new Schema<Property>({
  name: { type: String, required: true },
  type: { type: String, required: true },
  location: { type: String, required: true },
  otherProperty: { type: Schema.Types.ObjectId, ref: "Rental", required: true },
});
