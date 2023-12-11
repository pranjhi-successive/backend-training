import { type ICountry } from "../../../models/Countries";
import CountryRepository from "../repository/Country";

class Country {
  // eslint-disable-next-line @typescript-eslint/prefer-readonly
  private countryRepository: CountryRepository;

  constructor() {
    this.countryRepository = new CountryRepository();
  }

  async getCountryByName(countryName: string): Promise<ICountry | null> {
    return await this.countryRepository.findCountryByName(countryName);
  }

  async addPlayer(countryName: string, playerName: string[]): Promise<any> {
    // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
    return await this.countryRepository.addPlayer(countryName, playerName);
  }

  async removePlayer(countryName: string, playerName: string[]): Promise<void> {
    await this.countryRepository.removePlayerFromCountry(
      countryName,
      playerName,
    );
  }
}

export default Country;
