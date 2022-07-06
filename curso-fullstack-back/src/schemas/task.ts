import { model, Schema, Document } from 'mongoose';
import { UserInterface } from './user';

export enum StatusEnum {
    FINISHED = 'finished',
    OPEN = 'open',
}

export interface TaskInterface extends Document {
    description: string;
    status: StatusEnum;
    conclused: Date;
    responsibles: UserInterface;
    creation: Date;
}

const TaskSchema = new Schema({
  description: { type: String, required: [true, 'Description Obrigatorio'] },
  status: {
    type: String,
    validate: (value) => {
      if (value === StatusEnum.OPEN || value === StatusEnum.FINISHED) return true;
      return false;
    },
    message: (props) => '$(props.value) não é um status valido',
    required: [true, 'Status Obrigatorio'],
    uppercase: true,
  },
  responsibles: { type: Schema.Types.ObjectId, ref: 'User', required: [true, 'Campo Obrigatorio'] },
  conclused: { type: Date },
  creation: { type: Date, default: Date.now() },
});

export default model<TaskInterface>('Task', TaskSchema);
