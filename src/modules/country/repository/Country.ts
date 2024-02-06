import Repository from '../../../lib/base/Repository';
import logger from '../../../lib/logger';
import { ICountry } from '../entities/CountryInterface';
import { CountryModel } from './model/mobile';

class Country extends Repository<ICountry> {
    constructor() {
        super(CountryModel);
    }

    findCountryByName = async (
        countryName: string,
    ): Promise<ICountry | null> => {
        const country = await this.findOne({ countryName });
        logger.info('in repository', country);
        return country;
    };

    addPlayer = async (
        countryName: string,
        playersName: string[],
    ): Promise<ICountry> => {
        const result = await this.model.create(
            { countryName, playersName },
        );
        return result;
    };
}

export default Country;
