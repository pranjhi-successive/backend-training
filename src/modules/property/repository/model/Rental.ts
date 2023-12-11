import mongoose from "mongoose";
import { type Rental } from "../../../../entities/property/Rental";
import { RentalSchema } from "../schema/Rental";

export const RentalModel = mongoose.model<Rental>("Rental", RentalSchema);
