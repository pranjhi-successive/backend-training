import { type Request, type Response } from 'express';
import CountryService from '../services/Country';
import logger from '../../../lib/logger';

class Country {
    // eslint-disable-next-line @typescript-eslint/prefer-readonly
    private countryService: CountryService;

    constructor() {
        this.countryService = new CountryService();
    }

    getCountryByName = async (req: Request, res: Response): Promise<any> => {
        const { name } = req.params;
        try {
            const country = await this.countryService.getCountryByName(name);
            if (!country) {
                res.status(404).send({
                    status: '404',
                    message: ' Error No country found ',
                    time: new Date(),
                });
                return;
            }

            res.status(200).json({
                status: '200',
                message: 'successfull',
                data: country,
                time: new Date(),
            });
        } catch (error) {
            logger.error('Error getting country by name:', error);
            res.status(500).json({
                status: '500',
                message: ' Internal Server Error',
                time: new Date(),
            });
        }
    };

    addPlayer = async (req: Request, res: Response): Promise<void> => {
        try {
            const { countryName, playersName } = req.body;
            const add = await this.countryService.addPlayer(countryName, playersName);
            res.status(200).json({
                status: '200',
                message: 'Players added successfully',
                data: add,
                time: new Date(),
            });
        } catch (error) {
            logger.error('Error adding player to country:', error);
            res.status(500).json({
                status: '500',
                message: ' Internal Server Error',
                time: new Date(),
            });
        }
    };
}

export default Country;
