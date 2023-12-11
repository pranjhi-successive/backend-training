import mongoose, { Schema } from "mongoose";
import { type IUser } from "../entities/UserInterface";

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  address: {
    line1: { type: String, required: true },
    line2: { type: String, required: true },
    line3: { type: String, required: true },
  },
});
export const userModel = mongoose.model<IUser>("user", userSchema);
