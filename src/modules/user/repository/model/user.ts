import mongoose from 'mongoose';
import { IUser } from '../../entities/UserInterface';
import userSchema from '../schema/user';

const userModel = mongoose.model<IUser>('user', userSchema);
export default userModel;
