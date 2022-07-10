import { model, Schema, Document } from 'mongoose';

export interface UserInterface extends Document {
    name: string;
    email: string;
    password: string;
    born: Date;
    creation: Date;
}

const UserSchema = new Schema({
  name: { type: String, unique: true, required: [true, 'Nome Obrigatorio'] },
  email: {
    type: String, unique: true, required: [true, 'Email Obrigatorio'], lowercase: true,
  },
  born: { type: Date, unique: true, required: [true, 'Nascimento Obrigatorio'] },
  password: { type: String, required: [true, 'Email Obrigatorio'], select: false },
  creation: { type: Date, default: Date.now() },
});

export default model<UserInterface>('User', UserSchema);
