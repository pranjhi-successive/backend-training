import mongoose from "mongoose";
import { CustomerSchema } from "../schema/Customer";
import { type Customer } from "../../../../entities/property/Customer";

export const CustomerModel = mongoose.model<Customer>(
  "Customer",
  CustomerSchema,
);
