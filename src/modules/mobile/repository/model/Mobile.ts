import { model } from "mongoose";
import { type Mobile } from "../../../../entities/MobileInterface";
import { mobileSchema } from "../schema/Mobile";

export const MobileModel = model<Mobile>("Mobile", mobileSchema);
