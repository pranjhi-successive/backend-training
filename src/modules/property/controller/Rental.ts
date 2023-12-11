import { type Rental } from "../../../entities/property/Rental";
import type Repository from "../repository/Property";
import { type Request, type Response } from "express";

export class RentalController {
  private readonly repository: Repository<Rental>;

  constructor(repository: Repository<Rental>) {
    this.repository = repository;
  }

  async findOne(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
      const rental = await this.repository.findOne({ _id: id });

      if (rental) {
        res.status(200).json(rental);
      } else {
        res.status(404).json({ message: "Rental not found" });
      }
    } catch (error) {
      console.error("Error getting rental by ID:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async findAll(req: Request, res: Response): Promise<void> {
    try {
      const rentals = await this.repository.findAll();
      res.status(200).json(rentals);
    } catch (error) {
      console.error("Error getting all rentals:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async create(req: Request, res: Response): Promise<void> {
    const rentalData = req.body;

    try {
      const newRental = this.repository.create(rentalData);
      res.status(201).json(newRental);
    } catch (error) {
      console.error("Error creating rental:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async updateOne(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const updateData = req.body;

    try {
      await this.repository.updateOne({ _id: id }, updateData);
      res.status(200).json({ message: "Rental updated successfully" });
    } catch (error) {
      console.error("Error updating rental:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async deleteOne(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
      await this.repository.deleteOne({ _id: id });
      res.status(200).json({ message: "Rental deleted successfully" });
    } catch (error) {
      console.error("Error deleting rental:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
