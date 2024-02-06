import IBase from '../../../lib/base/interface';

export interface ICountry extends IBase {
  countryName: string;
  playersName: string[];
}
