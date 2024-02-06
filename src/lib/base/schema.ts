import mongoose from 'mongoose';
import IBase from './interface';

const base: mongoose.Schema<IBase> = new mongoose.Schema<IBase>({
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true },
});

export default base;
