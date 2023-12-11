import { type Rental } from "../../../entities/property/Rental";
import { RentalModel } from "../repository/model/Rental";
import Repository from "../repository/Property";

export class RentalService {
  private readonly rentalRepository: Repository<Rental>;

  constructor() {
    this.rentalRepository = new Repository(RentalModel);
  }

  // Implement methods based on your requirements
}
