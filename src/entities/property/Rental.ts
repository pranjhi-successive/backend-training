// import mongoose from "mongoose";
import { type Types, type Document } from "mongoose";
export interface Rental extends Document {
  customer: Types.ObjectId;
  property: Types.ObjectId;
  startDate: Date;
  endDate: Date;
  amount: number;
}
