import { type Customer } from "../../../entities/property/Customer";
import { CustomerModel } from "../repository/model/Customer";
import Repository from "../repository/Property";

export class CustomerService {
  private readonly customerRepository: Repository<Customer>;

  constructor() {
    this.customerRepository = new Repository(CustomerModel);
  }

  // Implement methods based on your requirements
}
