import { type Request, type Response } from "express";
import { type Services } from "../services/User";
import Validation from "../Validation";
export class Controller {
  private readonly services: Services;
  constructor(services: Services) {
    this.services = services;
  }

  async create(req: Request, res: Response): Promise<void> {
    const userData = req.body;
    const { error } = Validation.create(userData);
    if (error) {
      res.status(400).json({ error: error.details[0].message });
      return;
    }
    try {
      await this.services.create(userData);
      res.status(500).json({ error: "Server error" });
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getByName(req: Request, res: Response): Promise<void> {
    const { name } = req.params;

    try {
      const user = await this.services.getByName(name);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      console.error("Error getting user by name:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
