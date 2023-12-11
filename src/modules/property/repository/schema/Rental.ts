import { Schema } from "mongoose";
import { type Rental } from "../../../../entities/property/Rental";

export const RentalSchema = new Schema<Rental>({
  customer: { type: Schema.Types.ObjectId, ref: "Customer", required: true },
  property: { type: Schema.Types.ObjectId, ref: "Property", required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  amount: { type: Number, required: true },
});
