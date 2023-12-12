/* eslint-disable @typescript-eslint/no-misused-promises */
import express from "express";

import { model } from "mongoose";
import { MobileRepository } from "./repository/Mobile";
import { mobileSchema } from "./repository/schema/Mobile";
import { type Mobile } from "../../entities/MobileInterface";
import { MobileService } from "./services/mobile";
import { MobileController } from "./controller/Mobile";

const mobileRouter = express.Router();

const mobileRepository = new MobileRepository(
  model<Mobile>("Mobile", mobileSchema),
  "your_additional_property",
);
const mobileService = new MobileService(mobileRepository);

const mobileController = new MobileController(mobileService);

// eslint-disable-next-line @typescript-eslint/no-misused-promises
// mobileRouter.post("/mobiles", async (req, res) => {
//   await mobileController.getAllMobiles(req, res);
//   return mobileData;
// });t

// eslint-disable-next-line @typescript-eslint/unbound-method
mobileRouter.get("/mobiles", mobileController.getAllMobiles);

// eslint-disable-next-line @typescript-eslint/no-misused-promises
mobileRouter.post("/mobiles/:id", async (req, res) => {
  await mobileController.getMobileById(req, res);
});

export default mobileRouter;
