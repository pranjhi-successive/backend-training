import { model } from 'mongoose';
import IMobile from '../entities/MobileInterface';
import mobileSchema from './schema';

const MobileModel = model<IMobile>('Mobile', mobileSchema);
export default MobileModel;
