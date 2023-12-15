import mongoose, { Schema } from 'mongoose';
import { type IUser } from '../entities/UserInterface';

const userSchema = new Schema<IUser>({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    address: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
    },
});
const userModel = mongoose.model<IUser>('user', userSchema);
export default userModel;
