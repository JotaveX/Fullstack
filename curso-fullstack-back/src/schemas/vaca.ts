import { model, Schema, Document } from 'mongoose';

export interface VacaInterface extends Document {
    name: string;
    brinco: number;
    born: Date;
}

const VacaSchema = new Schema({
  name: { type: String, unique: true, required: [true, 'Nome Obrigatorio'] },
  brinco: {
    type: Number, unique: true, required: [true, 'Numero de brinco Obrigatorio'],
  },
  born: { type: Date, required: [true, 'Nascimento obrigatorio '] },
});

export default model<VacaInterface>('Vaca', VacaSchema);
