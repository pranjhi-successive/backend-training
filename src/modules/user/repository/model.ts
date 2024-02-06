import mongoose from 'mongoose';
import { IUser } from '../entities/UserInterface';
import userSchema from './schema';

const userModel = mongoose.model<IUser>('user', userSchema);
export default userModel;
