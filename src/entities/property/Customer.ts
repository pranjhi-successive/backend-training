import { type Document } from "mongoose";

export interface Customer extends Document {
  name: string;
  email: string;
  phone: string;
  address: string;
}
