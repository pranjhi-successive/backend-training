import { ICountry } from "../../models/Countries";
import CountryRepository from "../repository/Country.repository";
// import {  ICountry, ICountry } from "../../models/Countries";
import { string } from "joi";
class CountryService {
  private contryRepository: CountryRepository;
  constructor() {
    this.contryRepository = new CountryRepository();
  }
}
async getCountryByName(countryName : string): Promise<ICountry | null>{
    return this.countryRepository.findCountryByName(countryName),
}
