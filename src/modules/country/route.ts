import express from 'express';
import Country from './controller/Country';

const countryRouter = express.Router();
countryRouter.use(express.json());
const countryController = new Country();
countryRouter.post('/addPlayer', countryController.addPlayer);
countryRouter.get('/:name', countryController.getCountryByName);
export default countryRouter;
