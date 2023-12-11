import mongoose from "mongoose";
import { PropertySchema } from "../schema/Property";
import { type Property } from "../../../../entities/property/Property";

export const PropertyModel = mongoose.model<Property>(
  "Property",
  PropertySchema,
);
