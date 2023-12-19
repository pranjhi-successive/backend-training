import { ICountry } from '../entities/CountryInterface';
import CountryRepository from '../repository/Country';

class Country {
    // eslint-disable-next-line @typescript-eslint/prefer-readonly
    private countryRepository: CountryRepository;

    constructor() {
        this.countryRepository = new CountryRepository();
    }

    async getCountryByName(countryName: string): Promise<ICountry | null> {
        const result = await this.countryRepository.findCountryByName(countryName);
        return result;
    }

    addPlayer = async (countryName: string, playerName: string[]): Promise<any> => {
    // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
        const result = await this.countryRepository.addPlayer(countryName, playerName);
        return result;
    };

    removePlayer = async (countryName: string, playerName: string[]): Promise<void> => {
        await this.countryRepository.removePlayerFromCountry(
            countryName,
            playerName,
        );
    };
}

export default Country;
