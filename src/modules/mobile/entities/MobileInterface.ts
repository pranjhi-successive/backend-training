import IBase from '../../../lib/base/interface';

 interface IMobile extends IBase{
  brand: string;
  modelNumber: string;
  price: number;
  color: string;
  specifications: {
    display: string;
    camera: string;
    processor: string;
    storage: string;
  };
  releaseDate: Date;
  batteryCapacity: string;
  connectivity?: {
    wifi: boolean;
    bluetooth: boolean;
    cellular: boolean;
  };
  weight?: number;
  operatingSystem: string;
  isWaterResistant: boolean;
  additionalFeatures?: string[];
  accessories?: Array<{
    name: string;
    type?: string;
    price?: number;
  }>;
  warranty?: {
    validUntil?: Date;
    type?: string;
  };
  image: string;

}
export default IMobile;
