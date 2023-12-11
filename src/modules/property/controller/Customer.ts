import { type Request, type Response } from "express";
import type Repository from "../repository/Property";
import { type Customer } from "../../../entities/property/Customer";

export class CustomerController {
  private readonly repository: Repository<Customer>;

  constructor(repository: Repository<Customer>) {
    this.repository = repository;
  }

  async findOne(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
      const customer = await this.repository.findOne({ _id: id });

      if (customer) {
        res.status(200).json(customer);
      } else {
        res.status(404).json({ message: "Customer not found" });
      }
    } catch (error) {
      console.error("Error getting customer by ID:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async findAll(req: Request, res: Response): Promise<void> {
    try {
      const customers = await this.repository.findAll();
      res.status(200).json(customers);
    } catch (error) {
      console.error("Error getting all customers:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async create(req: Request, res: Response): Promise<void> {
    const customerData = req.body;

    try {
      const newCustomer = await this.repository.create(customerData);
      res.status(201).json(newCustomer);
    } catch (error) {
      console.error("Error creating customer:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async updateOne(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const updateData = req.body;

    try {
      await this.repository.updateOne({ _id: id }, updateData);
      res.status(200).json({ message: "Customer updated successfully" });
    } catch (error) {
      console.error("Error updating customer:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async deleteOne(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
      await this.repository.deleteOne({ _id: id });
      res.status(200).json({ message: "Customer deleted successfully" });
    } catch (error) {
      console.error("Error deleting customer:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
