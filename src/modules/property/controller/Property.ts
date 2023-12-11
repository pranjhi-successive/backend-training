import { type Request, type Response } from "express";
import type Repository from "../repository/Property";
import { type Property } from "../../../entities/property/Property";

export class PropertyController {
  private readonly repository: Repository<Property>;

  constructor(repository: Repository<Property>) {
    this.repository = repository;
  }

  async findOne(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
      const property = await this.repository.findOne({ _id: id });

      if (property) {
        res.status(200).json(property);
      } else {
        res.status(404).json({ message: "Property not found" });
      }
    } catch (error) {
      console.error("Error getting property by ID:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async findAll(req: Request, res: Response): Promise<void> {
    try {
      const properties = await this.repository.findAll();
      res.status(200).json(properties);
    } catch (error) {
      console.error("Error getting all properties:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async create(req: Request, res: Response): Promise<void> {
    const propertyData = req.body;

    try {
      const newProperty = await this.repository.create(propertyData);
      res.status(201).json(newProperty);
    } catch (error) {
      console.error("Error creating property:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async updateOne(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const updateData = req.body;

    try {
      await this.repository.updateOne({ _id: id }, updateData);
      res.status(200).json({ message: "Property updated successfully" });
    } catch (error) {
      console.error("Error updating property:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async deleteOne(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
      await this.repository.deleteOne({ _id: id });
      res.status(200).json({ message: "Property deleted successfully" });
    } catch (error) {
      console.error("Error deleting property:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
