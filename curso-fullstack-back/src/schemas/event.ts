import { model, Schema, Document } from 'mongoose';
import { VacaInterface } from './vaca';

export interface EventInterface extends Document {
  id: string;
   tipo: string;
   data: Date;
   conclused: boolean;
   descicao?: string;
   notificacion: Date[];
   vacas: VacaInterface[];
}

const EventSchema = new Schema({
  id: { type: String, required: true, unique: true },
  tipo: {
    type: String,
    unique: true,
    required: [true, 'Nome Obrigatorio'],
    uppercase: true,
  },
  data: { type: Date, unique: true, required: [true, 'Date de brinco obrigatorio'] },
  conclused: { type: Boolean, default: false },
  descicao: { type: String, unique: true },
  notificacion: { type: String },
  vacas: { type: Schema.Types.ObjectId, ref: 'Vaca', required: [true, 'Campo Obrigatorio'] },
});

export default model<EventInterface>('Event', EventSchema);
