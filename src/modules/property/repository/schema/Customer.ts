import { Schema } from "mongoose";
import { type Customer } from "../../../../entities/property/Customer";

export const CustomerSchema = new Schema<Customer>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
});
