import { Vaca } from './vaca';

export interface Event {
    id: any;
    tipo: string;
    data: Date;
    conclused: boolean;
    descicao?: string;
    notificacion: Date[];
    vacas: Vaca[];
 }
