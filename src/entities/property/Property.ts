import { type Schema, type Document } from "mongoose";

export interface Property extends Document {
  name: string;
  type: string;
  location: Location;
  otherProperty: Schema.Types.ObjectId;
}
