import { type Request, type Response } from "express";
import { type MobileService } from "../services/mobile";
import mobileData from "../../../utils/mobile";

export class MobileController {
  private readonly service: MobileService;

  constructor(service: MobileService) {
    this.service = service;
  }

  async createMobile(req: Request, res: Response, data: any): Promise<void> {
    try {
      const createdMobile = await this.service.createMobile(data);
      res.status(201).json({
        status: "success",
        data: createdMobile,
        time: new Date(),
      });
    } catch (error) {
      console.error("Error creating mobile:", error);
      res.status(500).json({
        status: "error",
        message: "Internal Server Error",
        time: new Date(),
      });
    }
  }

  async getAllMobiles(req: Request, res: Response): Promise<any> {
    console.log("Reached controller");
    try {
      // const mobiles = await this.service.getAllMobiles();
      // const data = mobileData;
      res.status(200).json({
        status: "success",
        data: mobileData,
        time: new Date(),
      });
    } catch (error) {
      console.error("Error getting all mobiles:", error);
      res.status(500).json({
        status: "error",
        message: "Internal Server Error",
        time: new Date(),
      });
    }
  }

  async getMobileById(req: Request, res: Response): Promise<void> {
    const { brand } = req.body;
    try {
      const mobile = await this.service.getMobileById(brand);

      if (mobile) {
        res.status(200).json({
          status: "success",
          data: mobile,
          time: new Date(),
        });
      } else {
        res
          .status(404)
          .json({ status: "not found", message: "Mobile not found" });
      }
    } catch (error) {
      console.error("Error getting mobile by ID:", error);
      res.status(500).json({
        status: "error",
        message: "Internal Server Error",
        time: new Date(),
      });
    }
  }
}
