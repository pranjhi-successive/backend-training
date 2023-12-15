import Repository from '../../../lib/base/Repository';

import { type ICountry, CountryModel } from '../../../models/Countries';

class Country extends Repository<ICountry> {
    constructor() {
        super(CountryModel);
    }

    public async findCountryByName(
        countryName: string,
    ): Promise<ICountry | null> {
        const country = await this.findOne({ CountryName: countryName });
        return country;
    }

    addPlayer = async (
        countryName: string,
        playerName: string[],
    ): Promise<void> => {
        try {
            this.model.create(
                { CountryName: countryName },
                { PlayersName: playerName },
            );
        } catch (error) {
            // console.error('Error adding player:', error);
        }
    };

    removePlayerFromCountry = async (
        countryName: string,
        playerName: string[],
    ): Promise<void> => {
        try {
            // await CountryModel.updateOne(
            //     { CountryName: countryName },
            //     { PlayersName: playerName },
            // );
            this.model.updateOne(
                { CountryName: countryName },
                { PlayersName: playerName },
            );
        } catch (error) {
            // console.error(`Error removing player from ${countryName}:`, error);
        }
    };
}

export default Country;
