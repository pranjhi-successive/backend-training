import { type Document } from 'mongoose';

export interface Mobile extends Document {
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
  connectivity: {
    wifi: boolean;
    bluetooth: boolean;
    cellular: boolean;
  };
  weight?: number; // Optional
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
}
