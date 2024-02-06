import { Schema } from 'mongoose';
import { IUser } from '../entities/UserInterface';

const userSchema = new Schema<IUser>({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
    },
});
export default userSchema;
