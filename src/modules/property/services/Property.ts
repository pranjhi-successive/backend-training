import { type Property } from "../../../entities/property/Property";
import { PropertyModel } from "../repository/model/Property";
import Repository from "../repository/Property";

export class PropertyService {
  private readonly propertyRepository: Repository<Property>;

  constructor() {
    this.propertyRepository = new Repository(PropertyModel);
  }

  // Implement methods based on your requirements
}
