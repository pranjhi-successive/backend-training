import Repository from "./Repository";

import { type ICountry, CountryModel } from "../../models/Countries";

class CountryRepository extends Repository<ICountry> {
  constructor() {
    super(CountryModel);
  }

  public async findCountryByName(
    countryName: string,
  ): Promise<ICountry | null> {
    const country = await this.findOne({ CountryName: countryName });
    return country;
  }

  public async addPlayer(
    countryName: string,
    playerName: string,
  ): Promise<void> {
    try {
      await this.updateOne(
        { CountryName: countryName },
        { $push: { PlayersName: playerName } },
      );
    } catch (error) {
      console.error(`Error adding player to ${countryName}:`, error);
    }
  }

  public async removePlayerFromCountry(
    countryName: string,
    playerName: string,
  ): Promise<void> {
    try {
      await this.updateOne(
        { CountryName: countryName },
        { $pull: { PlayersName: playerName } },
      );
    } catch (error) {
      console.error(`Error removing player from ${countryName}:`, error);
    }
  }
}

export default CountryRepository;
