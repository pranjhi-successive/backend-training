import { type Request, type Response } from 'express';
import CountryService from '../services/Country';

class Country {
    // eslint-disable-next-line @typescript-eslint/prefer-readonly
    private countryService: CountryService;

    path: string;

    constructor() {
        // console.log('CountryController constructor called');
        this.countryService = new CountryService();
        this.path = '/country';
    }

    async getCountryByName(req: Request, res: Response): Promise<any> {
        const countryName = req.body;
        try {
            const country = this.countryService.getCountryByName(countryName);
            res.status(500).json({
                status: '500',
                message: ' Internal Server Error',
                data: country,
                time: new Date(),
            });
        } catch (error) {
            // console.error('Error getting country by name:', error);
            res.status(500).json({
                status: '500',
                message: ' Internal Server Error',
                time: new Date(),
            });
        }
    }

    async addPlayer(req: Request, res: Response): Promise<any> {
        const { countryName, playerName } = req.body;
        try {
            // console.log('this.countryService:', this.countryService);
            const add = await this.countryService.addPlayer(countryName, playerName);
            res.status(200).json({
                status: '200',
                message: ' Players added successfully',
                data: add,
                time: new Date(),
            });
        } catch (error) {
            // console.error('Error adding player to country:', error);
            res.status(500).json({
                status: '500',
                message: ' Internal Server Error',
                time: new Date(),
            });
        }
    }

    async removePlayer(req: Request, res: Response): Promise<void> {
        const { countryName, playerName } = req.body;
        try {
            // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
            const remove = await this.countryService.removePlayer(
                countryName,
                playerName,
            );
            res.status(200).json({
                status: '200',
                message: ' Players removed successfully',
                data: remove,
                time: new Date(),
            });
        } catch (error) {
            // console.error('Error removing player from country:', error);
            res.status(500).json({
                status: '500',
                message: ' Internal Server Error',
                time: new Date(),
            });
        }
    }
}

export default Country;
